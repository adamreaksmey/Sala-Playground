import dotenv from 'dotenv'
dotenv.config()
import { csvToJson } from './services/academic-service/functions/csvtojson'
/**
 * This is where main functions are performed.
 * You may read the documents in the notes, import
 * and call functions from services, functions, ...etc.
 *
 * and perform your desired tasks. Happy coding! :)
 */
type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  const paths = [
    {
      academicService: [
        {
          students:
            '/Users/michaellogy/Desktop/sala-projects/data-sync-methods/students.csv',
        },
        {
          school: '/Users/michaellogy/Desktop/sala-projects/data-sync-methods/school.csv',
        },
        {
          configuration:
            '/Users/michaellogy/Desktop/sala-projects/data-sync-methods/configuration.csv',
        },
        {
          student_schema:
            '/Users/michaellogy/Desktop/sala-projects/data-sync-methods/student_schema.csv',
        },
      ],
    },
    {
      applicantService: [
        {
          applicants: {},
        },
      ],
    },
  ]

  const response = await csvToJson(
    '/Users/michaellogy/Desktop/sala-projects/data-sync-methods/configuration.csv'
  )
  console.log(response)
}

main().catch(console.error)
