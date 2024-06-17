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

  /**
   * Generates query based on your needs :).
   * @param data
   */
  public generator(data: any): any[] {
    let queries: any[] = []
    for (let item of data) {
      // Prepare column names and values
      const columns: string[] = Object.keys(item).filter(
        (key: string) => key !== 'tableName'
      )

      // Validates data for every object.
      let values: string[] = this.dataValidator(data, item)

      /**
       * Checks if tableConfig is correctly set.
       * @returns
       */
      const validatedConfig = (): boolean => {
        return (
          tableConfig[item.tableName] &&
          columns.includes(tableConfig[item.tableName].idColumn)
        )
      }

      if (validatedConfig()) {
        const config: TableEntityConfig = tableConfig[item.tableName]
        let updateColumns: string[] = config.updateColumns.filter((col: string) =>
          columns.includes(col)
        )

        /**
         * The following maps and properly wrap each
         * column from updateColumns in a proper double quotes.
         */
        let updateSet: string = updateColumns
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
        let idIndex: number = columns.indexOf(config.idColumn)
        let idValue: string = values[idIndex]

        queries = this.queryWriter(queries, {
          item,
          updateSet,
          config,
          idValue,
          columns,
          values,
        })
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
  private queryWriter(queries: any[], settings: any): any[] {
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
  private static sqlFileOutPutGenerator(data: any, outputPath: string): any {
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
