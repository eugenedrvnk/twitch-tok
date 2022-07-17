import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService
} from '@nestjs/config';
import { StorageModule } from './modules/storage/storage.module';
import { TwitchManagerModule } from './modules/twitch-manager/manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchVideo } from './entities/video.entity';
import { BullModule } from '@nestjs/bull';
import { TwitchVideoHandlerModule } from './modules/twitch-video-handler/video-handler.module';
import { TiktokUploadModule } from './modules/tiktok-upload/tiktok-upload.module';
import { ConfigService as CustomConfigService } from './modules/config/config.type';
import { ConfigModule as CustomConfigModule } from './modules/config/config.module';
import {StatusMonitorModule} from 'nestjs-status-monitor';
import { TiktokUpload } from './modules/tiktok-upload/tiktok-upload.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NestConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) => ({
        type: 'mysql',
        host: 'twitch-tok-db',
        port: 3306,
        username: 'twitch-tok',
        password: 'twitch-tok',
        database: 'twitch-tok',
        entities: [TwitchVideo, TiktokUpload],
        // synchronize: configService.getCurrentEnv() === "DEV" ? true : false,
        synchronize: true, // TODO: add migrations and disable sync for PROD
        extra: {
          charset: 'utf8mb4',
          collation: 'utf8mb4_unicode_ci',
        },
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    TwitchVideoHandlerModule,
    TwitchManagerModule,
    StorageModule,
    TiktokUploadModule,
    NestConfigModule,
  ],
})
export class AppModule { }
