import axios from 'axios'
import dotenv from 'dotenv'
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
  const currentExaminationIds = [
    '80b1ddf8-3c26-4ef8-ad59-28cc988c652d',
    'c6881c78-daa9-46da-8000-750d61d3abb0',
    'c4595c55-23c4-49c6-b471-1628e35a5b43',
    '445bf756-e312-4398-acb4-fd9f41483531',
  ]

  currentExaminationIds.forEach(async (id, index) => {
    const { data, ...rest } = await axios({
      method: 'get',
      baseURL: 'https://lms.ibfkh.org/api-qa',
      url: `/organizations/${process.env.IBF_PRODUCTION}/questionusers/search`,
      params: {
        start: 0,
        limit: 10000,
        filter: `subjectId#${id}`,
      },
    })

    for (const user of data.data) {
      const { data } = await axios({
        method: 'get',
        baseURL: 'https://lms.ibfkh.org/api-nest-user',
        url: `/user/${user._source.user.userId}/get_active_sessions`,
      })

      console.log('dataaaa', data)
    }

    // console.log(index, data.data)
    // console.log('rest', rest)
  })

  // console.log(data)
}

main().catch(console.error)
