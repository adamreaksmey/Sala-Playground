/**
 * Checks if value is valid uuid
 * @param {*} value
 * @returns
 */
export const isUUID = (value) => {
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
export const newMapper = (data, key) => {
   return new Map(
      data.map((user) => {
         return [user[key], user]
      })
   )
}
