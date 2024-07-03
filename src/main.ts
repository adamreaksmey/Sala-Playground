import dotenv from 'dotenv'
import Https from './functions/http/http'
import { generateByOperator, generateByPrefix } from 'cambodia-phone-generator'
import axios from 'axios'
import { data as classes } from './services/academic-service/class'
import { faker } from '@faker-js/faker'
import Academic from './services/academic-service/http/functions.http'
import Applicant from './services/applicant-service/http/applicant'
import { v4 as uuidv4 } from 'uuid'
import { generateRandomShits } from './functions/functions'

dotenv.config()
type MainFunctionType = () => Promise<void>

const getRandomClasses = () => {
  // ---- Group structure & structure records ---- //
  // ----------------------------------------------------
  // Pick a random object from the outer array
  const randomObject: any = classes[Math.floor(Math.random() * classes.length)]

  // Get the campusId
  const campusId = randomObject.campusId

  // Get the campus name
  const campusName = randomObject.campusName

  // Get the keys of the object, excluding campusId
  const keys = Object.keys(randomObject).filter((key) => key !== 'campusId')

  // Pick a random key from the keys
  const randomKey = keys[Math.floor(Math.random() * keys.length)]

  // Get the array corresponding to the random key
  const valuesArray = randomObject[randomKey]

  // Pick a random value from the values array
  const randomValue = valuesArray[Math.floor(Math.random() * valuesArray.length)]
  return {
    groupStructureId: randomKey,
    structureRecordId: randomValue,
    campusId,
    campusName,
  }
}

const main: MainFunctionType = async () => {
  const httpInstance = new Https(process.env.SMS_URL_DEV)
  const academicInstance = new Academic(process.env.SMS_URL_STAGING)
  const applicantInstance = new Applicant(process.env.SMS_URL_STAGING)

  const phoneOperators: any = ['Cellcard', 'Smart', 'Metfone', 'CooTel']
  const ITAschoolID = '8001ea7c-945c-4b95-81a6-044c67b53a52'

  // for (let i = 0; i < 50; i++) {
  //   const randomPhoneIndex = Math.floor(Math.random() * phoneOperators.length)
  //   const randomPhone = generateByOperator(phoneOperators[randomPhoneIndex])
  //   console.log('fetching user')
  //   const user = await axios({
  //     url: 'https://randomuser.me/api/',
  //     method: 'get',
  //   }).then((data) => {
  //     return data.data.results[0]
  //   })

  //   const idCard = await httpInstance
  //     ._get('/products_service/id/generator?prefix=IBF&type=sku')
  //     .then((id) => id.data)

  //   const { groupStructureId, structureRecordId, campusId } = getRandomClasses()

  //   const studentPayload = {
  //     phone: randomPhone,
  //     email: user.email,
  //     userName: user.login.username,
  //     lastName: user.name.first,
  //     firstName: user.name.last,
  //     firstNameNative: user.name.first,
  //     lastNameNative: user.name.last,
  //     gender: user.gender,
  //     dob: user.dob.date,
  //     guardianId: null,
  //     guardianName: null,
  //     uniqueKey: idCard,
  //     profile: {
  //       emailWork: user.email,
  //       email: user.email,
  //       jobDepartment: 'administration',
  //       jobDivision: 'administrative',
  //       jobLevel: 'non-management',
  //       jobPosition: faker.person.jobTitle(),
  //       password: randomPhone,
  //       phone: randomPhone,
  //       userName: user.login.username,
  //     },
  //     groupStructureId,
  //     structureRecordId,
  //   }

  //   const enrollStudent = await academicInstance.enrollStudent(
  //     studentPayload,
  //     ITAschoolID,
  //     campusId
  //   )

  //   console.log(enrollStudent.data)
  // }

  let count = 0
  for (let i = 0; i < 50; i++) {
    const randomPhoneIndex = Math.floor(Math.random() * phoneOperators.length)
    const randomPhone = generateByOperator(phoneOperators[randomPhoneIndex])
    const user = await axios({
      url: 'https://randomuser.me/api/',
      method: 'get',
    }).then((data) => {
      return data.data.results[0]
    })
    const randomGenders = ['male-ប្រុស', 'female-ស្រី']
    const randomGenderChosen =
      randomGenders[Math.floor(Math.random() * randomGenders.length)]

    const idCard = await httpInstance
      ._get('/products_service/id/generator?prefix=IBF&type=sku')
      .then((id) => id.data)
    const uuidUser = uuidv4()
    const { groupStructureId, structureRecordId, campusId } = getRandomClasses()

    // const applicant = {
    //   applicantStatus: 'pending',
    //   profile: {
    //     firstName: user.name.first,
    //     lastName: user.name.last,
    //     uniqueKey: idCard,
    //   },
    //   enrollToId: uuidv4(),
    //   enrollToSubject: 'STRUCTURE',
    //   enrollToDetail: {
    //     structureRecordId: structureRecordId,
    //     groupStructureId: groupStructureId,
    //     // structureId: '49d98257-e995-4537-820b-4ca7e8318eb0',
    //     // structurePath: '88566f74-e152-45ae-a281-b480feb4d411',
    //     name: faker.commerce.department(),
    //     schoolId: ITAschoolID,
    //     campusId: campusId,
    //     nameNative: faker.commerce.department(),
    //     code: generateRandomShits(4),
    //     description: faker.finance.transactionDescription(),
    //     enrollableCategory: null,
    //     schoolType: null,
    //     photo: null,
    //     recordType: null,
    //     qty: null,
    //     tags: ['Account', 'Morning shift'],
    //     statistic: {
    //       countStudent: 0,
    //       countSubject: 0,
    //       countTeacher: 0,
    //     },
    //     countStructure: null,
    //     isPromoted: false,
    //     isFeatured: false,
    //     isPublic: false,
    //     isOpen: true,
    //     startDate: '2023-06-30T17:00:00.000Z',
    //     endDate: '2023-09-30T16:59:59.000Z',
    //     extra: null,
    //     createdAt: '2023-07-31T10:39:18.795Z',
    //     updatedAt: '2023-07-31T10:39:18.795Z',
    //   },
    //   school: {
    //     name: 'Sala Tech PTE',
    //     nameNative: 'Sala Tech PTE',
    //     code: generateRandomShits(4),
    //     isPublic: 'yes',
    //   },
    //   schoolId: ITAschoolID,
    //   userId: uuidUser,
    //   idCard: idCard,
    //   uniqueKey: idCard,
    // }

    const _improvedApplicant = {
      userId: null,
      enrollToId: uuidUser,
      enrollToSubject: 'CAMPUS',
      enrollToDetail: {
        campusId: campusId,
        schoolId: ITAschoolID,
        name: getRandomClasses().campusName,
        nameNative: getRandomClasses().campusName,
        code: 'SALA',
        phone: randomPhone,
        email: 'admin@sala.com',
        photo: 'https://files.sala.tech/share/mzJAm2CW4yyZkIKN',
        map: null,
        address: null,
        isHq: true,
        roomsBuildings: null,
        createdAt: '2023-11-06T04:28:05.127Z',
        updatedAt: '2024-01-10T07:57:52.762Z',
        archiveStatus: 0,
        status: 'progress',
        isCampus: true,
      },
      profile: {
        phone: randomPhone,
        lastName: user.name.last,
        firstName: user.name.first,
        gender: randomGenderChosen,
        '58a56707-e0c3-4f56-a611-d8458795b825': '2024',
        email: user.email,
        'dfc4c73b-6cce-4c0e-a93d-30629e638bd8': null,
        'e5db7128-0eb8-4dac-bcf6-2f5d756cc1c0': 'yes-បាទ-ចាស',
        '78a56707-e0c3-4f56-a611-d8458795b825': [
          'deafness​-ថ្លង់',
          'mobility-impairments-ភាពមិនអាចធ្វើចលនាបាន',
        ],
        '0f161c83-9ffd-419a-a448-83a44346d4b3': 'student-សិស្ស-និស្សិត',
        '4ea07093-4932-4303-8838-d970e9f90367': null,
        '3cc9c2a6-13ab-416b-89d7-5ece4bf08cd8': null,
        'ed40bc46-df12-4e0c-ad13-aef872d765de': null,
        '950ebd3c-5c65-411e-a9ac-39c721c00e2f': null,
        'efb2d26c-60c1-4e62-8670-9712e197d109': null,
        '26d7f14f-b740-40d0-abe2-aeeca140a667': 'Arts',
        yearOfStudy: 'year-4',
        'a6200c68-a86b-4f76-8cf4-6072413591e7': 'cadt-បណ្ធិតសភាបច្ចេកវិទ្យាឌីជីថលកម្ពុជា',
        '931fd0f2-03d2-4585-9e66-63c55d1fbcb5': 'rural-ទីជនបទ',
        cityProvinceYouAreFrom: '2',
        'fc6412e4-6c92-46ed-a67e-9b5d8440f46e': '5',
        '70a0a9e1-2a7d-4e1d-b4e7-aef6dcf93ab0': ['english', 'other'],
        uniqueKey: idCard,
      },
      school: {
        name: 'Sala Tech',
        nameNative: 'Sala Tech',
        code: 'SALA',
        schoolId: ITAschoolID,
      },
      schoolId: ITAschoolID,
    }

    const registerApp = await applicantInstance.registerApplicant(
      _improvedApplicant,
      ITAschoolID
    )
    console.log(registerApp.data)
    count++
    console.log(count)
  }
}

main().catch(console.error)
