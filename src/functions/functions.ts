type UUIDResponseType = (value: string) => string | undefined
type MapperResponseType = (data: any, key: string) => Map<unknown, unknown>

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
