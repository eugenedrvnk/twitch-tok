import { AxiosRequestConfig, AxiosResponseHeaders } from "axios";

export type HttpRequestHeaders = Record<string, string | number | boolean>;

export type HttpRequestConfig = {
  headers?: Record<string, string | number | boolean>;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export type HttpRequstReturnType = {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export abstract class HttpService {
  abstract get(path: string, config?: HttpRequestConfig): Promise<HttpRequstReturnType>;
  abstract post(path: string, data: unknown, config?: HttpRequestConfig): Promise<HttpRequstReturnType>;
}