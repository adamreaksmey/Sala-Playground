import dotenv from 'dotenv'
dotenv.config()
import { csvToJson } from './services/academic-service/functions/csvtojson'
import Https from './functions/http/http'
import SQLgenerator from './functions/sql/generator'
/**
 * This is where main functions are performed.
 * You may read the documents in the notes, import
 * and call functions from services, functions, ...etc.
 *
 * and perform your desired tasks. Happy coding! :)
 */
type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  //   const instance = new Https(process.env.SMS_URL_STAGING)
  //   const payload = {
  //     name: 'Institute of Testing and Assuring',
  //     nameNative: 'Institute of Testing and Assuring',
  //     url: 'https://ita.staging.sala.tech',
  //     email: 'ita@gmail.com',
  //     phone: '011 2345 752/091 426 110',
  //     adminLastName: 'Admin',
  //     adminFirstName: 'ITA',
  //     schoolType: 'University',
  //     categories: [],
  //     code: 'ITA',
  //     schoolId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
  //     address: 'No. 10, Street 242 Khan Daun Penh, Phnom Penh, Cambodia',
  //     isPublic: 'no',
  //   }
  //   const createSchoolResponse = await instance._post('/academic_service/schools', payload)
  //   console.log(createSchoolResponse.data.data)

  const generatorInstance = new SQLgenerator()
  let response: any[] = await csvToJson(
    '/Users/michaellogy/Desktop/sala-projects/data-sync-methods/configuration.csv'
  )
  response = response.map((data) => {
    return {
      ...data,
      tableName: 'configuration',
    }
  })

  const createInsert = generatorInstance.generator(response)
  console.log(createInsert)

    // console.log(response)
}

main().catch(console.error)
