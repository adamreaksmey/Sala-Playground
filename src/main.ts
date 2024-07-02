import dotenv from 'dotenv'
dotenv.config()
import Https from './functions/http/http'
import SQLgenerator from './functions/sql/generator'
import _File from './functions/files/functions'
import { v4 as uuidv4 } from 'uuid'
import { hasKey, newMapper } from './functions/functions'
import uuids from './services/academic-service/logs/group_structure_uuid'
import { __sqlDataManipulator } from './functions/sql/manipulation'
import SQLMethods from './functions/sql/methods/operations.methods'

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
  const gradingRecords = await _File.csvToJson('./grading_data_set.csv')

  let mappedGrading = gradingRecords.map((data: any) => {
    return {
      ...data,
      orgId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
      tableName: 'data_set',
      dataSetId: uuidv4(),
    }
  })

  const createGradingInsert = generatorInstance.generator(mappedGrading)
  _File.reWriter('./src/services/report-service/data_set.sql', createGradingInsert, true)

  console.log(mappedGrading)

  return
}

main().catch(console.error)
