import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
// import base64 from './services/article-service/base64.sample'
import Https from './functions/http/http'
import { randomIndexBasedOnArray } from './functions/functions'
dotenv.config()

type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  const httpInstance = new Https(process.env.SMS_URL_STAGING)
  const authorName: any = ['male', 'female']
  const randomNumberInRange = faker.datatype.number({ min: 1, max: 100 })
  const pseOrgId = '6038e409-72a6-47bf-a002-4e1e1c5b2441'

  const counterSet: number = 150
  for (let i = 0; i < counterSet; i++) {
    const guardianPayload = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      firstNameNative: faker.name.firstName(),
      lastNameNative: faker.name.lastName(),
      gender: faker.name.gender(), // returns gender string
      dob: faker.date.past(50, new Date()).toISOString(), // date of birth in the past 50 years
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      photo: faker.image.avatar(),
      userName: faker.internet.userName(),
      systemAccess: {
        role: 'Guardian',
        password: faker.internet.password(10),
      },
    }

    console.log(i)

    const articleCreation = await httpInstance._post(
      `/academic_service/schools/${pseOrgId}/guardians`,
      guardianPayload
    )

    console.log(articleCreation.data)
  }
}

main().catch(console.error)
