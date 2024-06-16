import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class SQLgenerator {
  constructor() {}
  
  sayHello() {
    console.log('hello world')
  }
  /**
   * Write generated inserts statement to file.
   * if path exists, it writes into there. if no,
   * it creates a new one.
   * @param data
   * @param outputPath
   */
  private sqlFileOutPutGenerator(data: any, outputPath: string) {
    const filePath = path.join(__dirname, outputPath)
    try {
      fs.writeFileSync(join(__dirname, outputPath), data.join('\n'))
    } catch (error: unknown | any) {
      if (error.code === 'ENOENT') {
        // Create the parent directory if it doesn't exist
        fs.mkdirSync(path.dirname(filePath), { recursive: true })

        // Write the file again
        fs.writeFileSync(filePath, data)
        console.log('File created successfully at', filePath)
      } else {
        console.error('Error occurred while writing the file:', error)
      }
    }
  }
}

export default SQLgenerator
