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

  public async _get(url: string): Promise<unknown> {
    let response: AxiosResponse<any, any> | unknown
    try {
      response = await axios({
        method: httpMethods.post,
        url: `${this.host}` + url,
        data: this.payload,
      })
    } catch (error) {
      console.log(error)
      response = error
    }

    return response
  }
}

export default Https
