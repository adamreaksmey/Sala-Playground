import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface TableEntityConfig {
  /* Defines what columns you want updated. */
  updateColumns: string[]
  /* Your key column, this can be used to find a specific row from a value. */
  idColumn: string
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

  /**
   * Generates query based on your needs :).
   * @param data
   */
  public generator(data: any[]): string[] {
    let queries: string[] = []
    for (let item of data) {
      // Prepare column names and values
      let columns = Object.keys(item).filter((key) => key !== 'tableName')

      // Validates data for every object.
      let values = this.dataValidator(columns, item)

      const idCard = (() => {
        return Object.prototype.hasOwnProperty.call(item, 'idCard') ? item.idCard : null
      })()

      if (
        tableConfig[item.tableName] &&
        columns.includes(tableConfig[item.tableName].idColumn)
      ) {
        const config = tableConfig[item.tableName]
        let updateColumns = config.updateColumns.filter((col) => columns.includes(col))

        let updateSet = updateColumns
          .map((col) => {
            let valueIndex = columns.indexOf(col)
            return `"${col}" = ${
              values[valueIndex] === "''" ? 'NULL' : values[valueIndex]
            }`
          })
          .join(', ')

        // If no update columns are present, set the first configurable column to NULL
        if (!updateSet && config.updateColumns.length) {
          updateSet = `"${config.updateColumns[0]}" = NULL`
        }

        let idIndex = columns.indexOf(config.idColumn)
        let idValue = values[idIndex]

        queries = this.queryWriter(queries, {
          item,
          updateSet,
          config,
          idValue,
          columns,
          values,
        })
      } else {
        // Build the standard insert query for other cases
        queries.push(
          `INSERT INTO public.${item.tableName} (${columns
            .map((column) => `"${column}"`)
            .join(', ')}) VALUES (${values
            .map((value) => (value === "''" ? 'NULL' : value))
            .join(', ')});`
        )
      }
    }

    return queries
  }

  /**
   * This function corrects, parse & validates any invalid data.
   * @param columns
   * @param item
   */
  private dataValidator(columns: string[], item: any): string[] {
    const response = columns.map((column: string) => {
      let value = item[column]
      if (typeof value === 'string') {
        // Properly escape single quotes in strings
        return `'${value.replace(/'/g, '`')}'`
      } else if (
        value === null ||
        value === undefined ||
        value === '' ||
        value === 'NULL'
      ) {
        // Explicitly handle null, undefined, and empty string values
        return 'NULL'
      } else {
        // Convert other data types to JSON string and quote
        return `'${JSON.stringify(value)}'`
      }
    })

    console.log(response)
    return response
  }

  /**
   * This function writes and generates query based on your needs.
   * I will try to make this more dynamic in the future as of now,
   * you'd have to write your own query.
   *
   * @param queries
   * @param settings
   * @returns
   */
  private queryWriter(queries: any[], settings: any, operation_method?: string): any[] {
    const { item, updateSet, config, idValue, columns, values } = settings

    switch (item.tableName) {
      case 'lms_courses_users':
        queries.push(`UPDATE public.${item.tableName}
        SET ${updateSet}
        WHERE "${config.idColumn}" = ${idValue};`)
        break

      default:
        queries.push(
          `INSERT INTO public.${item.tableName} (${columns
            .map((column: any) => `"${column}"`)
            .join(', ')}) VALUES (${values
            .map((value: any) => (value === "''" ? 'NULL' : value))
            .join(', ')});`
        )
        break
    }

    return queries
  }

  /**
   * Write generated inserts statement to file.
   * if path exists, it writes into there. if no,
   * it creates a new one.
   * @param data
   * @param outputPath
   */
  public sqlFileOutPutGenerator(data: any, outputPath: string): any {
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
