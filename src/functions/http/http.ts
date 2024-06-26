import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { httpMethods } from './static'

const LOCALHOST = process.env.LOCAL_URL

class Https {
  constructor(
    private readonly url: string,
    private readonly payload: any
  ) {
    this.url = url
    this.payload = payload
  }

  public async _get() {
    let response: AxiosResponse<any, any> | unknown
    try {
      response = await axios({
        method: httpMethods.post,
        url: this.url,
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
