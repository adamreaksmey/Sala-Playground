import axios from 'axios'
import type { AxiosResponse } from 'axios'
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
    payload?: any
  ): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _get(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.GET, url, payload)
  }

  public async _post(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.POST, url, payload)
  }

  public async _patch(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.PATCH, url, payload)
  }

  public async _put(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.PUT, url, payload)
  }

  public async _connect(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.CONNECT, url, payload)
  }

  public async _options(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.OPTIONS, url, payload)
  }

  public async _trace(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.TRACE, url, payload)
  }

  public async _head(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    return this.request(HttpMethods.HEAD, url, payload)
  }

  public async _head(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: 'HEAD',
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _put(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: 'PUT',
      baseURL: this.host,
      url,
      data: payload,
    })

    return response.data
  }
}

export default Https
