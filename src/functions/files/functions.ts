import * as fs from 'fs'
import * as path from 'path'

class _File {
  constructor() {}

  /**
   * Writes a content into a file if exists or creates a new one.
   * @param filePath 
   * @param fileContent 
   */
  reWriter(filePath: string, fileContent: string): void {
    try {
      fs.writeFileSync(filePath, fileContent)
    } catch (error: any) {
      if (error.code === 'ENOENT') {
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
