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
// import employeesStaging from '../hr-staging.employees.json'
// import employeeSchema from '../src/services/hr-service/hr-staging.employeeschemas.json'
// import organization from '../src/services/hr-service/hr-staging.organization.json'
// import applicant from '../applicant-staging.applicants.json'
// import applicantSchema from "../applicant-staging.applicantschemas.json"
import applicantStep from '../applicant-staging.applicantsteps.json'

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

  // ------------ EMPLOYEES ----------------
  // const newEmployees: any = employeesStaging.map((data) => {
  //   if (data?.department.campusId == '385a1621-3a0b-45a2-b219-5397dcbaad1a')
  //     data.department.campusId = '45b5c684-8e17-4a3f-a87d-662bc291ce8f'
  //   if (data?.department.campusId == 'dafeb565-cfd3-490b-aefc-5c9a78282b2e')
  //     data.department.campusId = '6b6e0818-76cc-4798-87da-75600f645767'
  //   if (data?.department.campusId == '93446d8c-854b-4512-b1ec-3be394c66390')
  //     data.department.campusId = '9899e202-3c52-478c-9845-ba7fbc1cef7f'
  //   if (data?.department.campusId == '77813d4e-efd9-4015-9030-f221c7355ecc')
  //     data.department.campusId = 'be8650db-8dfc-4f61-9dbc-90f5a5a973e0'
  //   if (data?.department.campusId == '74d51238-b94e-4926-862f-3e86bd6271aa')
  //     data.department.campusId = 'eaaf1680-9bd5-47a9-abb3-a767fee4e098'
  //   return {
  //     ...data,
  //     _id: uuidv4(),
  //   }
  // })

  // ------------ APPLICANT SCHEMA ----------------
  let newApplicants: any = applicantStep

  const newCollection: any = () => {
    let newAppSet: any[] = []

    for (const iterator of newApplicants) {
      newAppSet.push({
        ...iterator,
        // _id: uuidv4(),
      })
    }

    return newAppSet
  }

  // return console.log(newCollection())

  // ------------ MONGO AREA -----------------------
  const mongouri = 'mongodb+srv://adam:UT3BpVvvLZwO4oYX@sala-cluster.uafixpy.mongodb.net/'
  const client = new MongoClient(mongouri)

  try {
    await client.connect()
    console.log('mongo connected')

    const database = client.db('applicant-staging')
    const collection = database.collection('applicantsteps')

    const result = await collection.insertMany(newCollection())
    // const result = await collection.deleteMany({ layout: { $exists: true } })

    console.log('shit inserted', result)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }

  return
}

main().catch(console.error)
