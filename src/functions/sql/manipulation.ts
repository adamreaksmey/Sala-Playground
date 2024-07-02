import { promises as pfs } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'
import { sqlToObjects } from './parser.js'

type manipulatorType = (
  tableName: string | null | undefined,
  filePath: any
) => Promise<any>
/**
 * The following function takes an insert statement queries of an sql file
 * turn it into an array of objects.
 * @param {*} tableName
 * @param {*} filePath
 * @returns
 */
export const __sqlDataManipulator: manipulatorType = async (
  tableName: string | null = null,
  filePath: any
) => {
  const sqlFileContent: string = await pfs.readFile(filePath, {
    encoding: 'utf8',
  })
  const objectsContent = (await sqlToObjects(sqlFileContent)).map(
    replaceNullWithEmptyString
  )

  let formattedContent = []

  if (tableName == 'calendar') {
    for (const data of objectsContent) {
      formattedContent.push({
        tableName,
        ...data,
      })
    }

    return formattedContent.filter(
      (row) => row.orgId == '8001ea7c-945c-4b95-81a6-044c67b53a52'
    )
  }

  // if (tableName == '') {
  // }

  return objectsContent
}

const replaceNullWithEmptyString = (data: any) => {
  for (const key in data) {
    if (data[key] === 'NULL') {
      data[key] = ''
    }
  }
  return data
}
