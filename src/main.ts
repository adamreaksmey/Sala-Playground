import {
  createOrganization,
  updatedOrganization,
} from './services/product-service/api/api'
import { v4 as uuidv4 } from 'uuid'
import _File from './functions/files/functions'
import created_uuid from './services/product-service/logs/created_uuid'

type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  const storedUUId = []

  // for (let i = 0; i < 100; i++) {
  //   const payload = {
  //     referenceId: uuidv4(),
  //     name: 'IBF Institute' + i,
  //     nameNative: 'IBF Institute native' + i,
  //     code: 'ORG-CODE' + i,
  //     address: 'street 12 #12, Phnom Penh',
  //     description: 'Some description' + i,
  //     bankInfo: [
  //       {
  //         bankName: '',
  //         bankNumber: '',
  //         bankImage: [],
  //         bankCurrency: '$',
  //       },
  //     ],
  //   }
  //   storedUUId.push(payload.referenceId)
  //   const response = await createOrganization(payload)
  //   console.log('success response', response?.data)
  // }

  // _File.reWriter(
  //   'src/services/product-service/logs/created_uuid.ts',
  //   `export default ${JSON.stringify(storedUUId)}`
  // )

  for (const iterator of created_uuid) {
    const payload = {
      orgId: iterator,
      name: 'IBF Institute',
      nameNative: 'IBF Institute native',
      code: 'ORG-CODE',
    }

    const response = await updatedOrganization(payload)
    console.log(response)
  }
}

main().catch(console.error)
