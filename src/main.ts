dotenv.config()
import dotenv from 'dotenv'
import Https from './functions/http/http'
import student from './services/followup-service/data/student'
import employees from './services/followup-service/data/employees'
import { randomIndexBasedOnArray } from './functions/functions'
import { faker } from '@faker-js/faker'

type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  const httpInstance = new Https(process.env.SMS_URL_STAGING)

  for (let i = 0; i < 30; i++) {
    const students = randomIndexBasedOnArray(student.data)
    const teachers = randomIndexBasedOnArray(employees.data)

    const followupPayload = {
      name: faker.lorem.lines({ min: 1, max: 3 }),
      followUpOn: [
        {
          participantId: students.studentId,
          participantIdCard: students.idCard,
          firstName: students.firstName,
          lastName: students.lastName,
          firstNameNative: students.firstNameNative,
          lastNameNative: students.lastNameNative,
          phone: students.profile.profile.phone,
          gender: students.gender,
          uniqueKey: students.uniqueKey,
          idCard: students.idCard,
          type: 'student',
        },
      ],
      date: faker.date.anytime(),
      // Can include students and teachers.
      participants: [
        {
          participantId: students.studentId,
          participantIdCard: students.idCard,
          firstName: students.firstName,
          lastName: students.lastName,
          firstNameNative: students.firstNameNative,
          lastNameNative: students.lastNameNative,
          phone: students.profile.profile.phone,
          gender: students.gender,
          email: faker.internet.email(),
          type: 'student',
        },
        {
          participantId: teachers._id,
          participantIdCard: teachers.idCard,
          firstName: teachers.firstName,
          lastName: teachers.lastName,
          firstNameNative: teachers.firstNameNative,
          lastNameNative: teachers.lastNameNative,
          phone: teachers.phone,
          gender: teachers.gender,
          email: teachers.email,
          type: 'teacher',
        },
      ],
      status: 'Default',
      situation: 'situation1',
      problem: 'adasdsadsad',
      document: [],
      profile: '',
      content: '',
      reportBy: [
        {
          participantId: '76734bc7-946a-4fe7-9a2d-a68753dd99e6',
          userName: 'admin-demo@sala',
          firstName: 'Super',
          email: 'admin.demo@sala.co',
          keycloakUserId: '6038e409-72a6-47bf-a002-4e1e1c5b2441',
          type: 'teacher',
        },
      ],
      startDate: faker.date.anytime(),
      endDate: faker.date.anytime(),
      followUpBy: [
        {
          participantId: '76734bc7-946a-4fe7-9a2d-a68753dd99e6',
          userName: 'admin-demo@sala',
          firstName: 'Super',
          email: 'admin.demo@sala.co',
          keycloakUserId: '6038e409-72a6-47bf-a002-4e1e1c5b2441',
          type: 'teacher',
        },
      ],
      notification: {
        email: [],
        title: 'New Case in Follow up',
        description: 'new case',
      },
    }

    const responseFollowup: any = httpInstance._post(
      `followup_service/schools/${process.env.PSE_STAGING}/topic`,
      followupPayload
    )

    console.log('Response success!', i, responseFollowup.data)
  }
}

main().catch(console.error)
