import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { httpMethods } from './static'

class Https {
  constructor(private readonly host: string) {}

  public async _get(url: string, payload: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.post,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _post(url: string, payload: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.post,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _patch(url: string, payload: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.patch,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }

  public async _delete(url: string, payload: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.delete,
      baseURL: this.host,
      url,
      data: payload,
    })

    return response
  }
}

export default Https
