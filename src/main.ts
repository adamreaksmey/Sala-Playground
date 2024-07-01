import dotenv from 'dotenv'
dotenv.config()
import { csvToJson } from './services/academic-service/functions/csvtojson'
import Https from './functions/http/http'
import SQLgenerator from './functions/sql/generator'
import _File from './functions/files/functions'
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

  let response: any[] = [
    {
      campusId: 'a63b16fe-eda8-4f23-a214-951b81b9c01c',
      schoolId: '0170ebdf-f7b9-4e6c-b803-2c1565677699',
      name: 'Digital Workforce Development',
      nameNative: 'Digital Workforce Development',
      code: 'DWD',
      phone: 123456789,
      email: 'admin@dwd.com',
      address: '',
      isHq: 't',
      roomsBuildings: '',
      createdAt: '2023-11-06 04:28:05.127553+00',
      updatedAt: '2024-01-10 07:57:52.76296+00',
      archiveStatus: 0,
      status: 'progress',
      photo: 'https://files.sala.tech/share/mzJAm2CW4yyZkIKN',
      map: '',
    },
    {
      campusId: '77813d4e-efd9-4015-9030-f221c7355ecc',
      schoolId: '0170ebdf-f7b9-4e6c-b803-2c1565677699',
      name: 'USEA Career Center',
      nameNative: 'USEA Career Center',
      code: 'USEACC',
      phone: null,
      email: 'useacc@mail.com',
      address: '',
      isHq: 'f',
      roomsBuildings: '',
      createdAt: '2023-11-20 07:45:06.577409+00',
      updatedAt: '2024-01-03 03:00:04.093782+00',
      archiveStatus: 0,
      status: 'progress',
      photo: 'https://files.sala.tech/share/Zm4kyl2bE0ksv7yJ',
      map: '',
    },
    {
      campusId: '93446d8c-854b-4512-b1ec-3be394c66390',
      schoolId: '0170ebdf-f7b9-4e6c-b803-2c1565677699',
      name: 'NUM Career Center',
      nameNative: 'NUM Career Center',
      code: 'NUMCC',
      phone: 99124578,
      email: 'careercenter@num.edu.kh',
      address: 'https://maps.app.goo.gl/AicVmp9VAHCHpUxX7',
      isHq: 'f',
      roomsBuildings: '',
      createdAt: '2023-11-06 04:22:19.105445+00',
      updatedAt: '2024-01-10 07:58:50.288149+00',
      archiveStatus: 0,
      status: 'progress',
      photo: 'https://files.sala.tech/share/fvDXMZpeqBdduOQC',
      map: '',
    },
    {
      campusId: 'dafeb565-cfd3-490b-aefc-5c9a78282b2e',
      schoolId: '0170ebdf-f7b9-4e6c-b803-2c1565677699',
      name: 'NUBB Career Center',
      nameNative: 'NUBB Career Center',
      code: 'NUBBCC',
      phone: 12124578,
      email: 'nubbcc@mail.com',
      address: '',
      isHq: 'f',
      roomsBuildings: '',
      createdAt: '2023-11-20 07:45:54.185017+00',
      updatedAt: '2024-01-03 02:58:31.919204+00',
      archiveStatus: 0,
      status: 'progress',
      photo: 'https://files.sala.tech/share/GonfUCpyC4UmEfBM',
      map: '',
    },
    {
      campusId: '385a1621-3a0b-45a2-b219-5397dcbaad1a',
      schoolId: '0170ebdf-f7b9-4e6c-b803-2c1565677699',
      name: 'CADT Career Center',
      nameNative: 'CADT Career Center',
      code: 'CADTCC',
      phone: null,
      email: 'cadtcc@mail.com',
      address: '',
      isHq: 'f',
      roomsBuildings: '',
      createdAt: '2023-11-06 04:31:41.816155+00',
      updatedAt: '2024-02-05 07:36:05.12652+00',
      archiveStatus: 0,
      status: 'progress',
      photo: 'https://files.sala.tech/share/ReXw2VTFDXc62dPN',
      map: '',
    },
    {
      campusId: '74d51238-b94e-4926-862f-3e86bd6271aa',
      schoolId: '0170ebdf-f7b9-4e6c-b803-2c1565677699',
      name: 'SRU Career Center',
      nameNative: 'SRU Career Center',
      code: 'SRUCC',
      phone: null,
      email: 'srucc@mail.com',
      address: '',
      isHq: 'f',
      roomsBuildings: '',
      createdAt: '2023-11-20 07:45:24.221586+00',
      updatedAt: '2024-05-20 09:56:20.26159+00',
      archiveStatus: 0,
      status: 'progress',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4haOPaWfTnX1U58JiIIcelf3hDhQOziZXy1X-bNNMg&s',
      map: '',
    },
  ]

  response = response.map((data) => {
    return {
      ...data,
      tableName: 'campus',
    }
  })

  const createInsert = generatorInstance.generator(response)
  const fileInstance = _File.reWriter(
    './src/services/academic-service/logs/data.sql',
    createInsert
  )
  // const logQueries = generatorInstance.sqlFileOutPutGenerator(
  //   createInsert,
  //   './src/services/academic-service/logs/data.sql'
  // )
}

main().catch(console.error)
