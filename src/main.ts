import dotenv from 'dotenv'
dotenv.config()
import { csvToJson } from './services/academic-service/functions/csvtojson'
import Https from './functions/http/http'
import SQLgenerator from './functions/sql/generator'
import _File from './functions/files/functions'
import { v4 as uuidv4 } from 'uuid'
import { hasKey, newMapper } from './functions/functions'
import uuids from './services/academic-service/logs/group_structure_uuid'

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
  // group_structure
  // let response: any[] = await _File.csvToJson('./group_structure.csv')
  // response = response
  //   .map((data) => {
  //     if (data.campusId == '385a1621-3a0b-45a2-b219-5397dcbaad1a')
  //       data.campusId = '45b5c684-8e17-4a3f-a87d-662bc291ce8f'
  //     if (data.campusId == 'dafeb565-cfd3-490b-aefc-5c9a78282b2e')
  //       data.campusId = '6b6e0818-76cc-4798-87da-75600f645767'
  //     if (data.campusId == '93446d8c-854b-4512-b1ec-3be394c66390')
  //       data.campusId = '9899e202-3c52-478c-9845-ba7fbc1cef7f'
  //     if (data.campusId == '77813d4e-efd9-4015-9030-f221c7355ecc')
  //       data.campusId = 'be8650db-8dfc-4f61-9dbc-90f5a5a973e0'
  //     if (data.campusId == '74d51238-b94e-4926-862f-3e86bd6271aa')
  //       data.campusId = 'eaaf1680-9bd5-47a9-abb3-a767fee4e098'

  //     // if (data.groupStructureId == '8ae67c8a-8fa0-4fa2-8fb4-6811050be8b6') data.groupStructureId = ''

  //     return {
  //       ...data,
  //       tableName: 'group_structure',
  //       schoolId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
  //       groupStructureId: uuidv4(),
  //     }
  //   })
  //   .filter((row) => hasKey(row, 'status'))

  // const uuids = []
  // for (const iterator of response) {
  //   uuids.push(iterator.groupStructureId)
  // }
  // _File.reWriter(
  //   './src/services/academic-service/logs/group_structure_uuid.ts',
  //   JSON.stringify(uuids)
  // )

  // structure_record
  // let response: any[] = await _File.csvToJson('./structure_record.csv')
  // response = response.map((data) => {
  //   if (data.campusId == '385a1621-3a0b-45a2-b219-5397dcbaad1a')
  //     data.campusId = '45b5c684-8e17-4a3f-a87d-662bc291ce8f'
  //   if (data.campusId == 'dafeb565-cfd3-490b-aefc-5c9a78282b2e')
  //     data.campusId = '6b6e0818-76cc-4798-87da-75600f645767'
  //   if (data.campusId == '93446d8c-854b-4512-b1ec-3be394c66390')
  //     data.campusId = '9899e202-3c52-478c-9845-ba7fbc1cef7f'
  //   if (data.campusId == '77813d4e-efd9-4015-9030-f221c7355ecc')
  //     data.campusId = 'be8650db-8dfc-4f61-9dbc-90f5a5a973e0'
  //   if (data.campusId == '74d51238-b94e-4926-862f-3e86bd6271aa')
  //     data.campusId = 'eaaf1680-9bd5-47a9-abb3-a767fee4e098'

  //   if (data.groupStructureId == '8ae67c8a-8fa0-4fa2-8fb4-6811050be8b6')
  //     data.groupStructureId = '5603fa9b-3590-48c0-938d-971a7cd33ecb'
  //   if (data.groupStructureId == '6f93755a-32f2-4e65-83d6-fee651c786de')
  //     data.groupStructureId = '7d26e107-c78f-445b-bc3a-b7148629f2ed'
  //   if (data.groupStructureId == '8159031c-e448-45ab-9d17-6c8a23301146')
  //     data.groupStructureId = '7d7dc1dc-c019-4f31-b29d-792b46f42eec'
  //   if (data.groupStructureId == 'a6e337a1-e806-44b0-97b7-f2fdb75cb4d5')
  //     data.groupStructureId = '332f26e9-27a5-4133-a2ba-6f4dd1717217'
  //   if (data.groupStructureId == '38b0af37-0f00-47f8-98cc-43a7cb8aefd7')
  //     data.groupStructureId = '7f4a1940-4266-46a0-b12d-387770bcc7a7'
  //   if (data.groupStructureId == 'c54e3b36-2d5a-4196-b58f-a91ff120b693')
  //     data.groupStructureId = '6fb641ac-6f86-4c3f-a814-b4fb43d61a25'
  //   if (data.groupStructureId == '0018e2f3-1a03-42cd-87f6-8d4289276ea1')
  //     data.groupStructureId = 'ccacb6a3-4279-4349-9737-0b29ec8b0741'
  //   if (data.groupStructureId == '09403392-d6f2-4c27-8fcc-121977b05fac')
  //     data.groupStructureId = 'b29ed4b7-e7dc-43e5-a974-27ef0f2c6050'
  //   if (data.groupStructureId == '58d71fa4-3cf0-4877-af33-a844cfa494cb')
  //     data.groupStructureId = 'e4f4515c-4bf0-4e17-beb2-3977ed49b9d8'
  //   if (data.groupStructureId == '31fbb2c6-43c6-478c-b0ef-01c2dd835778')
  //     data.groupStructureId = 'c122b1cd-5a32-4b3e-a3c8-7076b0689f3b'
  //   if (data.groupStructureId == 'b6a00c1d-1dac-4606-b812-f05ba47a7a48')
  //     data.groupStructureId = '823ae7b3-f587-4c21-9ea5-b9cb6ad8ecda'

  //   return {
  //     ...data,
  //     tableName: 'structure_record',
  //     schoolId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
  //     structureRecordId: uuidv4(),
  //   }
  // })
  // const uuids = []
  // for (const iterator of response) {
  //   uuids.push(iterator.structureRecordId)
  // }
  // _File.reWriter(
  //   './src/services/academic-service/logs/structure_record_uuid.ts',
  //   JSON.stringify(uuids)
  // )

  // -- Step 1, map old and new ids

  let groupStructures: any[] = await _File.csvToJson('./group_structure.csv')
  groupStructures = groupStructures.slice(0, -1)

  groupStructures = groupStructures.map((data) => {
    if (data.campusId == '385a1621-3a0b-45a2-b219-5397dcbaad1a')
      data.campusId = '45b5c684-8e17-4a3f-a87d-662bc291ce8f'
    if (data.campusId == 'dafeb565-cfd3-490b-aefc-5c9a78282b2e')
      data.campusId = '6b6e0818-76cc-4798-87da-75600f645767'
    if (data.campusId == '93446d8c-854b-4512-b1ec-3be394c66390')
      data.campusId = '9899e202-3c52-478c-9845-ba7fbc1cef7f'
    if (data.campusId == '77813d4e-efd9-4015-9030-f221c7355ecc')
      data.campusId = 'be8650db-8dfc-4f61-9dbc-90f5a5a973e0'
    if (data.campusId == '74d51238-b94e-4926-862f-3e86bd6271aa')
      data.campusId = 'eaaf1680-9bd5-47a9-abb3-a767fee4e098'

    return {
      ...data,
      schoolId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
      // groupStructureId: newGSuuid,
      replacement: {
        old_groupStructureId: data.groupStructureId,
        new_groupStructureId: uuidv4(),
      },
    }
  })

  const mappedGS = newMapper(groupStructures, 'groupStructureId')

  let structureRecords: any[] = await _File.csvToJson('./structure_record.csv')
  structureRecords = structureRecords.slice(0, -1) // -- pop because it always comes out +1

  structureRecords = structureRecords.map((data) => {
    if (data.campusId == '385a1621-3a0b-45a2-b219-5397dcbaad1a')
      data.campusId = '45b5c684-8e17-4a3f-a87d-662bc291ce8f'
    if (data.campusId == 'dafeb565-cfd3-490b-aefc-5c9a78282b2e')
      data.campusId = '6b6e0818-76cc-4798-87da-75600f645767'
    if (data.campusId == '93446d8c-854b-4512-b1ec-3be394c66390')
      data.campusId = '9899e202-3c52-478c-9845-ba7fbc1cef7f'
    if (data.campusId == '77813d4e-efd9-4015-9030-f221c7355ecc')
      data.campusId = 'be8650db-8dfc-4f61-9dbc-90f5a5a973e0'
    if (data.campusId == '74d51238-b94e-4926-862f-3e86bd6271aa')
      data.campusId = 'eaaf1680-9bd5-47a9-abb3-a767fee4e098'

    return {
      ...data,
      schoolId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
      groupStructureId: mappedGS.get(data.groupStructureId)?.replacement
        .new_groupStructureId,
      replacement: {
        old_structureRecordId: data.structureRecordId,
        new_structureRecordId: uuidv4(),
      },
    }
  })

  const mappedSR = newMapper(structureRecords, 'structureRecordId')

  // students
  let students: any[] = await _File.csvToJson('./student.csv')
  students = students.slice(0, -1) // -- pop because it always comes out +1

  students = students.map((data) => {
    if (data.campusId == '385a1621-3a0b-45a2-b219-5397dcbaad1a')
      data.campusId = '45b5c684-8e17-4a3f-a87d-662bc291ce8f'
    if (data.campusId == 'dafeb565-cfd3-490b-aefc-5c9a78282b2e')
      data.campusId = '6b6e0818-76cc-4798-87da-75600f645767'
    if (data.campusId == '93446d8c-854b-4512-b1ec-3be394c66390')
      data.campusId = '9899e202-3c52-478c-9845-ba7fbc1cef7f'
    if (data.campusId == '77813d4e-efd9-4015-9030-f221c7355ecc')
      data.campusId = 'be8650db-8dfc-4f61-9dbc-90f5a5a973e0'
    if (data.campusId == '74d51238-b94e-4926-862f-3e86bd6271aa')
      data.campusId = 'eaaf1680-9bd5-47a9-abb3-a767fee4e098'

    return {
      ...data,
      schoolId: '8001ea7c-945c-4b95-81a6-044c67b53a52',
      groupStructureId: mappedGS.get(data.groupStructureId)?.replacement
        .new_groupStructureId,
      structureRecordId: mappedSR.get(data.structureRecordId)?.replacement
        .new_structureRecordId,
    }
  })

  // -- Step 2, export them as queries
  groupStructures = groupStructures.map((data) => {
    const newGsId = data?.replacement.new_groupStructureId
    delete data.replacement
    return {
      ...data,
      groupStructureId: newGsId,
      tableName: 'group_structure',
    }
  })
  const createInsertGS = generatorInstance.generator(groupStructures)
  _File.reWriter('./src/services/academic-service/logs/data.gs.sql', createInsertGS, true)

  structureRecords = structureRecords.map((data) => {
    const newSrId = data?.replacement.new_structureRecordId
    delete data.replacement
    return {
      ...data,
      structureRecordId: newSrId,
      tableName: 'structure_record',
    }
  })
  const createInsertSR = generatorInstance.generator(structureRecords)
  _File.reWriter('./src/services/academic-service/logs/data.sr.sql', createInsertSR, true)

  students = students.map((data) => {
    delete data.studentId
    return {
      ...data,
      tableName: 'student',
    }
  })
  const createInsertStudent = generatorInstance.generator(students)
  _File.reWriter(
    './src/services/academic-service/logs/data.student.sql',
    createInsertStudent,
    true
  )

  return console.log('success')

  // const createInsert = generatorInstance.generator(response)
  // _File.reWriter('./src/services/academic-service/logs/data.sql', createInsert, true)
}

main().catch(console.error)
