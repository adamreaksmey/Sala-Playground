import axios from 'axios'
import { httpMethods } from './endpoints'
import type { AxiosResponse } from 'axios'

const LOCALHOST = process.env.LOCAL_URL

export async function createOrganization(data: any): Promise<any> {
  let response: AxiosResponse<any, any> | unknown
  try {
    response = await axios({
      method: httpMethods.post,
      url: `${LOCALHOST}/products_service/organizations`,
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
      url: `${LOCALHOST}/products_service/organizations/${data.orgId}`,
      data,
    })
  } catch (error) {
    console.log(error)
    response = error
  }

  return response
}
