import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { httpMethods } from './static'
import { __HTTP__ } from './static'

class Https implements __HTTP__ {
  constructor(private readonly host: string | undefined) {
    if (!host) {
      throw new Error('Host is undefined or never provided!')
    }
  }

  public async _get(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.get,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response.data
  }

  public async _post(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.post,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _patch(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.patch,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _delete(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.delete,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
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

  public async _connect(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: 'CONNECT',
      baseURL: this.host,
      url,
      data: payload,
    })

    return response.data
  }

  public async _options(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: 'OPTIONS',
      baseURL: this.host,
      url,
      data: payload,
    })

    return response.data
  }

  public async _trace(url: string, payload?: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: 'TRACE',
      baseURL: this.host,
      url,
      data: payload,
    })

    return response.data
  }
}

export default Https
