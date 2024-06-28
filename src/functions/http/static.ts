import type { AxiosResponse } from 'axios'
/**
 * Reserved http methods
 */
export const httpMethods = {
  post: 'POST',
  get: 'GET',
  patch: 'PATCH',
  delete: 'DELETE',
}

export interface __HTTP__ {
  _get(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _post(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _patch(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _delete(url: string, payload: any): Promise<AxiosResponse<any, any>>
  _head(url: string, payload?: any): Promise<AxiosResponse<any, any>>
}
