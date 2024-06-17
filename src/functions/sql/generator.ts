import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface TableEntityConfig {
  updateColumns: string[] /* Defines what columns you want updated. */
  idColumn: string /* Your key column, this can be used to find a specific row from a value. */
}

interface TableConfig {
  /* The key is your table's name or tableName's value. */
  [key: string]: TableEntityConfig
}

/**
 * Current setting example. modify as you desire! :)
 */
const tableConfig: TableConfig = {
  user: {
    updateColumns: ['guardianId', 'guardianName', 'employer'],
    idColumn: 'idCard',
  },
  student: {
    updateColumns: ['groupStructureId', 'structureRecordId'],
    idColumn: 'idCard',
  },
}

class SQLgenerator {
  constructor() {}

  sayHello(): any {
    console.log('hello world')
  }

  /**
   * Write generated inserts statement to file.
   * if path exists, it writes into there. if no,
   * it creates a new one.
   * @param data
   * @param outputPath
   */
  private sqlFileOutPutGenerator(data: any, outputPath: string): any {
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
