import * as fs from 'fs'
import * as path from 'path'

class _File {
  constructor() {}

  /**
   * Writes a content into a file if exists or creates a new one.
   * @param filePath
   * @param fileContent
   */
  public static reWriter(filePath: string, fileContent: string): void {
    try {
      console.log('Attempting to write file at:', filePath)
      fs.writeFileSync(filePath, fileContent)
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
}

export default _File
