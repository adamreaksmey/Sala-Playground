import { createOrganization } from './services/product-service/api/api'
import { v4 as uuidv4 } from 'uuid';

type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  for (let i = 0; i < 100; i++) {
    const payload = {
      referenceId: '{{ORG_ID}}',
      name: 'IBF Institute' + i,
      nameNative: 'IBF Institute native' + i,
      code: 'ORG-CODE' + i,
      address: 'street 12 #12, Phnom Penh',
      description: 'Some description' + i,
      bankInfo: [
        {
          bankName: '',
          bankNumber: '',
          bankImage: [],
          bankCurrency: '$',
        },
      ],
    }
    const response = await createOrganization(payload)
    console.log('success response', response?.data)
  }
}

main().catch(console.error)
