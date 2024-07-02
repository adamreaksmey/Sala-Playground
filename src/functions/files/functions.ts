import * as fs from 'fs'
import * as path from 'path'
import Papa from 'papaparse'

class _File {
  constructor() {}

  /**
   * Writes a content into a file if exists or creates a new one.
   * @param filePath
   * @param fileContent
   */
  public static reWriter(filePath: string, fileContent: any, isQuery?: boolean): void {
    try {
      console.log('Attempting to write file at:', filePath)
      fs.writeFileSync(filePath, isQuery ? fileContent.join('\n') : fileContent)

      console.log('File written successfully at', filePath)
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log('Directory does not exist, creating it:', path.dirname(filePath))
        // Create the parent directory if it doesn't exist
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        // Write the file again
        fs.writeFileSync(filePath, fileContent)
        console.log('File created successfully at', filePath)
      } else {
        console.error('Error occurred while writing the file:', error)
      }
    }
  }

  /**
   * Using Papaparse to convert csv to json
   * @param filePath
   * @returns
   */
  public static csvToJson(filePath: string): Promise<unknown | any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
          return
        }

        Papa.parse(data, {
          header: true,
          complete: (results) => {
            resolve(results.data.slice(0, -1)) // Have to slice it off because it keeps coming out +1
          },
          error: (error: unknown | any) => {
            reject(error)
          },
        })
      })
    })
  }
}

export default _File
