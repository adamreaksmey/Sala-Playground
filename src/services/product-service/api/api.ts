import axios from 'axios'
import { localHost, httpMethods } from './endpoints'
import type { AxiosResponse } from 'axios'

export async function createOrganization(data: any): Promise<any> {
  let response: AxiosResponse<any, any> | unknown
  try {
    response = await axios({
      method: httpMethods.post,
      url: `${localHost}/organizations`,
      data,
    })
  } catch (error) {
    console.log(error)
    response = error
  }

  return response
}

export async function updatedOrganization(data: any): Promise<any> {
  let response: AxiosResponse<any, any> | unknown
  try {
    response = await axios({
      method: httpMethods.patch,
      url: `${localHost}/organizations/${data.orgId}`,
      data,
    })
  } catch (error) {
    console.log(error)
    response = error
  }

  return response
}
