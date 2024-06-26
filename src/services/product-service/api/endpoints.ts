const { env } = process

/* Local & dev url */
export const localHost = `${env.LOCAL_URL}/products_service`
export const devHost = 'https://sms-api.dev.sala.tech/products_service'
/* Staging url */
export const IBF_stagingHost = 'https://sms-api.staging.ibfkh.org/products_service'
export const SALA_stagingHost = 'https://sms-api.staging.sala.tech/products_service'
/* Production url */
export const IBF_prodHost = 'https://sms-api.ibfkh.org/products_service'

export const httpMethods = {
  post: 'POST',
  get: 'GET',
  patch: 'PATCH',
  delete: 'DELETE',
}
