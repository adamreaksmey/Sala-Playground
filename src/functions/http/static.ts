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
}

export interface __HTTP__ {
<<<<<<< HEAD
  _get(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _post(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _patch(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _delete(url: string, payload: any): Promise<AxiosResponse<any, any>>
=======
  _get(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _post(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _patch(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _put(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _connect(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _options(url: string, payload?: any): Promise<AxiosResponse<any, any>>
  _trace(url: string, payload?: any): Promise<AxiosResponse<any, any>>
>>>>>>> 0b1b4f194831be8bb527c107f0ace27d5daef753
  _head(url: string, payload?: any): Promise<AxiosResponse<any, any>>
}
