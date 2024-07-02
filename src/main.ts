import dotenv from 'dotenv'
import Https from './functions/http/http'
import { generateByOperator, generateByPrefix } from 'cambodia-phone-generator'
import axios from 'axios'
import { data as classes } from './services/academic-service/class'
import { faker } from '@faker-js/faker';

dotenv.config()
type MainFunctionType = () => Promise<void>

const getRandomClasses = () => {
  // ---- Group structure & structure records ---- //
  // ----------------------------------------------------
  // Pick a random object from the outer array
  const randomObject: any = classes[Math.floor(Math.random() * classes.length)]

  // Get the keys of the object
  const keys = Object.keys(randomObject)

  // Pick a random key from the keys
  const randomKey = keys[Math.floor(Math.random() * keys.length)]

  // Get the array corresponding to the random key
  const valuesArray = randomObject[randomKey]

  // Pick a random value from the values array
  const randomValue = valuesArray[Math.floor(Math.random() * valuesArray.length)]
  return {
    groupStructure: randomKey,
    structureRecord: randomValue,
  }
}

const main: MainFunctionType = async () => {
  const httpInstance = new Https(process.env.SMS_URL_DEV)
  const phoneOperators: any = ['Cellcard', 'Smart', 'Metfone', 'CooTel']

  for (let i = 0; i < 100; i++) {
    const randomPhoneIndex = Math.floor(Math.random() * phoneOperators.length)
    const randomPhone = generateByOperator(phoneOperators[randomPhoneIndex])
    const user = await axios({
      url: 'https://randomuser.me/api/',
      method: 'get',
    }).then((data) => {
      return data.data.results[0]
    })
    const idCard = await httpInstance
      ._get('/products_service/id/generator?prefix=IBF&type=sku')
      .then((id) => id.data)

    console.log(user)
    const studentPayload = {
      phone: randomPhone,
      email: user.email,
      userName: user.login.username,
      lastName: user.name.first,
      firstName: user.name.last,
      firstNameNative: user.name.first,
      lastNameNative: user.name.last,
      gender: user.gender,
      dob: user.dob.date,
      guardianId: null,
      guardianName: null,
      uniqueKey: idCard,
      profile: {
        emailWork: user.email,
        email: user.email,
        jobDepartment: 'administration',
        jobDivision: 'administrative',
        jobLevel: 'non-management',
        jobPosition: 'Web Developer',
        password: randomPhone,
        phone: randomPhone,
        userName: user.login.username,
      },
      groupStructureId: getRandomClasses().groupStructure,
      structureRecordId: getRandomClasses().structureRecord,
    }
  }
}

main().catch(console.error)
