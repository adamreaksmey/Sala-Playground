import dotenv from 'dotenv'
import SQLgenerator from './functions/sql/generator'
import { __sqlDataManipulator } from './functions/sql/manipulation'
import _File from './functions/files/functions'
import school from './../AcademicSchoolsTable-prod'

dotenv.config()
/**
 * This is where main functions are performed.
 * You may read the documents in the notes, import
 * and call functions from services, functions, ...etc.
 *
 * and perform your desired tasks. Happy coding! :)
 */
type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  const generatorInstance = new SQLgenerator()

  const mappedTypes = school.Items.map((data) => {
    return {
      tableName: 'example_table',
      standOutMessagesKhmer: data.standOutMessagesKhmer.S,
      status: data.status.S,
    }
  })
  // return
  const createCalendarInsert = generatorInstance.generator(mappedTypes)
  _File.reWriter('./src/schools.sql', createCalendarInsert, true)
}

main().catch(console.error)
