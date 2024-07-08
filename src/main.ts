import dotenv from 'dotenv'
import Https from './functions/http/http'
dotenv.config()
/**
 * This is where main functions are performed.
 * You may read the documents in the notes, import
 * and call functions from services, functions, ...etc.
 *
 * and perform your desired tasks. Happy coding! :)
 */
type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  const httpInstance = new Https(process.env.SMS_URL_STAGING)
  for (let i = 0; i < 100; i++) {
    const followupPayload = {
      name: 'adasdsadsad',
      followUpOn: [
        {
          participantId: '76543097-9a70-4b86-b1a3-c5da1ae92898',
          participantIdCard: '0987654323',
          firstName: '0987654323',
          lastName: '0987654323',
          firstNameNative: null,
          lastNameNative: null,
          phone: '0987654323',
          gender: null,
          uniqueKey: '0987654323',
          idCard: '0987654323',
          type: 'student',
        },
      ],
      date: '2024-07-30T09:55:52+07:00',
      participants: [
        {
          participantId: '6c5a4ebb-ed7e-4c8d-a68a-96d26604e358',
          participantIdCard: 'new',
          firstName: 'new',
          lastName: 'new',
          firstNameNative: 'new',
          lastNameNative: 'new',
          phone: '0999999999',
          gender: 'male',
          email: 'new@gmail.com',
          type: 'teacher',
        },
        {
          participantId: '707d045a-3308-4c5f-baba-3daf67eb7d2e',
          participantIdCard: '150624',
          firstName: 'Chheng3',
          lastName: 'Mouy3',
          firstNameNative: 'Chheng3',
          lastNameNative: 'Mouy3',
          phone: '777262518',
          gender: 'male',
          email: 'chheng.mouy2@gmail.com',
          type: 'teacher',
        },
        {
          participantId: '76543097-9a70-4b86-b1a3-c5da1ae92898',
          participantIdCard: '0987654323',
          firstName: '0987654323',
          lastName: '0987654323',
          firstNameNative: null,
          lastNameNative: null,
          phone: '0987654323',
          gender: null,
          uniqueKey: '0987654323',
          type: 'student',
        },
        {
          participantId: '0f918d33-e8af-4d00-8e9c-b511a47dea85',
          participantIdCard: '0987654321',
          firstName: '0987654321',
          lastName: '0987654321',
          firstNameNative: null,
          lastNameNative: null,
          phone: '0987654321',
          gender: null,
          uniqueKey: '0987654321',
          type: 'student',
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
          participantId: '2f452ccd-01e0-4bd3-a06e-f29226b8a42f',
          userName: 'superadmin@dev',
          firstName: 'Admin',
          email: 'admin@mail.com',
          keycloakUserId: '7100ebdf-f7b9-4e6c-b803-2c1565677996',
          type: 'teacher',
        },
      ],
      startDate: '2024-07-30T09:55:52+07:00',
      endDate: '2024-07-30T09:55:52+07:00',
      followUpBy: [
        {
          participantId: '2f452ccd-01e0-4bd3-a06e-f29226b8a42f',
          userName: 'superadmin@dev',
          firstName: 'Admin',
          email: 'admin@mail.com',
          keycloakUserId: '7100ebdf-f7b9-4e6c-b803-2c1565677996',
          type: 'teacher',
        },
      ],
      notification: {
        email: [],
        title: 'New Case in Follow up',
        description: 'new case',
      },
    }

    const responseFollowup = await httpInstance._post(
      `followup_service/schools/${process.env.PSE_STAGING}/topic`
    )
  }
}

main().catch(console.error)
