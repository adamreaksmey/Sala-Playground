import type { AxiosResponse } from 'axios'
/**
 * Reserved http methods
 */
export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  CONNECT = 'connect',
  OPTIONS = 'options',
  TRACE = 'trace',
  HEAD = 'head',
  DELETE = 'delete',
}

export interface __HTTP__ {
  _get(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _post(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _patch(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _put(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _connect(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _options(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _trace(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _head(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _delete(url: string, payload?: any): Promise<AxiosResponse<any, any>>
}
