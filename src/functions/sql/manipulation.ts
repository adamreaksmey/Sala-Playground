import { promises as pfs } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'
import { sqlToObjects } from './parser.js'

type manipulatorType = (tableName: null | undefined, filePath: any) => Promise<any>
/**
 * The following function takes an insert statement queries of an sql file
 * turn it into an array of objects.
 * @param {*} tableName
 * @param {*} filePath
 * @returns
 */
export const __sqlDataManipulator: manipulatorType = async (
  tableName = null,
  filePath: any
) => {
  const sqlFileContent: string = await pfs.readFile(filePath, {
    encoding: 'utf8',
  })
  const objectsContent = (await sqlToObjects(sqlFileContent)).map(
    replaceNullWithEmptyString
  )

  let formattedContent = []

  if (tableName == 'some_table_name') {
    for (const data of objectsContent) {
      formattedContent.push({
        // Do data manipulation here :)
        // tableName,
        // uniqueKey: data.idCard,
        // guardianId: data?.guardianId,
      })
    }
  } else {
    formattedContent = objectsContent
  }

  return formattedContent
}

const replaceNullWithEmptyString = (data: any) => {
  for (const key in data) {
    if (data[key] === 'NULL') {
      data[key] = ''
    }
  }
  return data
}
