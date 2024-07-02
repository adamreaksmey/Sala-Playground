import dotenv from 'dotenv'
dotenv.config()
import { csvToJson } from './services/academic-service/functions/csvtojson'
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
  const filterNullStatus = await __sqlDataManipulator(
    'organizer',
    './src/services/schedule-service/updated/organizer.sql'
  )
  const noNullStatus = filterNullStatus.map((data: any) => {
    // const trimmed = data.status.trim()
    // const mainStatus = !trimmed || trimmed == '' ? 'pending' : trimmed
    // console.log(mainStatus)
    return {
      ...data,
      // status: mainStatus,
      organizerId: uuidv4(),
    }
  })

  console.log(noNullStatus)
  // return
  const createCalendarInsert = generatorInstance.generator(noNullStatus)
  _File.reWriter(
    './src/services/schedule-service/preped/organizer.sql',
    createCalendarInsert,
    true
  )

  return
  const filteredDwdonly = await __sqlDataManipulator(
    'event',
    './src/services/schedule-service/event.sql'
  )

  // PK: eventId
  let eventReplacement = filteredDwdonly
    .map((data: any) => {
      return {
        ...data,
        replacement: {
          old_eventId: data.eventId,
          new_eventId: uuidv4(),
        },
      }
    })
    .filter((row: any) => row.orgId == '8001ea7c-945c-4b95-81a6-044c67b53a52')

  const mappedE_replacement = newMapper(eventReplacement, 'eventId')

  const organizerFiltered = await __sqlDataManipulator(
    'organizer',
    './src/services/schedule-service/organizer.sql'
  )

  // PK: organizerId
  let organizerReplacement = organizerFiltered
    .map((data: any) => {
      delete data.organizerId
      return {
        ...data,
        eventId: mappedE_replacement.get(data.eventId)?.replacement.new_eventId,
      }
    })
    .filter((row: any) => row.orgId == '8001ea7c-945c-4b95-81a6-044c67b53a52')
  const mappedOrg_replacement = newMapper(organizerReplacement, 'organizerId')

  // PK: participantId
  const participantFiltered = await __sqlDataManipulator(
    'participant',
    './src/services/schedule-service/participant.sql'
  )
  let participantReplacement = participantFiltered
    .map((data: any) => {
      return {
        ...data,
        eventId: mappedE_replacement.get(data.eventId)?.replacement.new_eventId,
        replacement: {
          old_participantId: data.old_participantId,
          new_participantId: uuidv4(),
        },
      }
    })
    .filter((row: any) => row.orgId == '8001ea7c-945c-4b95-81a6-044c67b53a52')

  const mappedP_replacement = newMapper(participantReplacement, 'participantId')

  // table: calendar_user
  const calendarUserFiltered = await __sqlDataManipulator(
    'calendar_user',
    './src/services/schedule-service/calendar_user.sql'
  )
  let calendarUserReplacement = calendarUserFiltered
    .map((data: any) => {
      return {
        ...data,
        participantId: mappedP_replacement.get(data.participantId)?.replacement
          .new_participantId,
      }
    })
    .filter((row: any) => row.participantId)

  // -- Step 2: write results:
  // ----- EVENT ------
  eventReplacement = eventReplacement.map((data: any) => {
    const newEventId = data?.replacement.new_eventId
    delete data.replacement
    return {
      ...data,
      eventId: newEventId,
    }
  })
  const createEventInsert = generatorInstance.generator(eventReplacement)
  _File.reWriter(
    './src/services/schedule-service/updated/event.sql',
    createEventInsert,
    true
  )

  // --- ORGANIZER -----
  const createOrganizerInsert = generatorInstance.generator(organizerReplacement)
  _File.reWriter(
    './src/services/schedule-service/updated/organizer.sql',
    createOrganizerInsert,
    true
  )

  // ---- Participant ----
  participantReplacement = participantReplacement.map((data: any) => {
    const newParticipantId = data?.replacement.new_participantId
    delete data.replacement
    return {
      ...data,
      participantId: newParticipantId,
    }
  })
  const createParticipantInsert = generatorInstance.generator(participantReplacement)
  _File.reWriter(
    './src/services/schedule-service/updated/participant.sql',
    createParticipantInsert,
    true
  )

  // ---- Calendar users ----
  const createCUinsert = generatorInstance.generator(calendarUserReplacement)
  _File.reWriter(
    './src/services/schedule-service/updated/calendar_user.sql',
    createCUinsert,
    true
  )
  return
}

main().catch(console.error)
