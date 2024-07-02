import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { HttpMethods } from './static'
import { __HTTP__ } from './static'

class Https implements __HTTP__ {
  constructor(private readonly host: string | undefined) {
    if (!host) {
      throw new Error('Host is undefined or never provided!')
    }
  }

  private async request(
    method: HttpMethods,
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    const request: AxiosRequestConfig = {
      method,
      baseURL: this.host,
      url,
      data: payload,
      headers,
    }

    if (method == HttpMethods.GET) {
      request['params'] = payload
    }
    const response: AxiosResponse<any, any> = await axios(request)
    return response
  }

  public async _get(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.GET, url, payload, headers)
  }

  public async _post(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.POST, url, payload, headers)
  }

  public async _patch(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.PATCH, url, payload, headers)
  }

  public async _put(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.PUT, url, payload, headers)
  }

  public async _connect(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.CONNECT, url, payload, headers)
  }

  public async _options(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.OPTIONS, url, payload, headers)
  }

  public async _trace(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.TRACE, url, payload, headers)
  }

  public async _head(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.HEAD, url, payload, headers)
  }

  public async _delete(
    url: string,
    payload?: any,
    headers?: any
  ): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.DELETE, url, payload, headers)
  }
}

export default Https
