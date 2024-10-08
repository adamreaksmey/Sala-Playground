type UUIDResponseType = (value: string) => string | undefined
type MapperResponseType = (data: any, key: string) => Map<any, any>

/**
 * Checks if value is valid uuid
 * @param {*} value
 * @returns
 */
export const isUUID: UUIDResponseType = (value: string) => {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isUUID = uuidPattern.test(value)
  if (isUUID) return value
  //   return "b740450d-a05d-4e1d-a235-1d507702f30d";
}

/**
 * Mapper to use to compensate for the find function.
 * @param {*} data
 * @param {*} key
 * @returns
 */
export const newMapper: MapperResponseType = (data: any, key: string) => {
  return new Map(
    data.map((user: any) => {
      return [user[key], user]
    })
  )
}

/**
 * A safer function to check whether an object has a
 * passed key.
 * @param _obj
 * @param _key
 * @returns
 */
export const hasKey = (_obj: object, _key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(_obj, _key)
}

/**
 * Can be used to generate random shits.
 * @param length 
 * @returns 
 */
export const generateRandomShits = (length: number = 8): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?'

  const allCharacters = uppercase + lowercase + digits + specialCharacters
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length)
    password += allCharacters[randomIndex]
  }

  return password
}

/**
 *
 * @param arr
 * @returns {number}
 */
export const randomIndexBasedOnArray = (arr: any[]): number => {
  return Math.floor(Math.random() * arr.length)
}
