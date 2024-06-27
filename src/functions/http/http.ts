import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { httpMethods } from './static'

const LOCALHOST = process.env.LOCAL_URL

class Https {
  constructor(
    private readonly host: string,
    private readonly payload: any
  ) {
    this.host = host
    this.payload = payload
  }

  public async _get(url: string): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.post,
      baseURL: this.host,
      url,
      data: this.payload,
    })

    return response
  }

  public async _post(url: string) {
    const response: AxiosResponse<any, any> = await axios({
      method: httpMethods.get,
      baseURL: this.host,
      url,
      data: this.payload,
    })

    return response
  }
}

export default Https
