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
import { MongoClient } from 'mongodb'
import employeesStaging from '../hr-staging.employees.json'

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

  const newEmployees: any = employeesStaging.map((data) => {
    return {
      ...data,
      _id: uuidv4(),
    }
  })

  const mongouri = 'mongodb+srv://adam:UT3BpVvvLZwO4oYX@sala-cluster.uafixpy.mongodb.net/'
  const client = new MongoClient(mongouri)

  try {
    await client.connect()
    console.log('mongo connected')

    const database = client.db('hr-staging')
    const collection = database.collection('employees')

    const result = await collection.insertMany(newEmployees)

    console.log('shit inserted', result)
  } catch (error) {
    console.log(error)
  }

  return
}

main().catch(console.error)
