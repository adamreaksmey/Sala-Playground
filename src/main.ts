import dotenv from 'dotenv'
import Https from './functions/http/http'
import { generateRandomShits } from './functions/functions'
dotenv.config()

type MainFunctionType = () => Promise<void>

const main: MainFunctionType = async () => {
  for (let i = 0; i < 100; i++) {
    const httpInstance = new Https(process.env.SMS_URL_DEV)
    const orgId = '27c0b377-f28e-4ba1-afb9-5eaed02fee6c'
    const payload = {
      sellingPrice: 100,
      originalPrice: 10,
      name: generateRandomShits(10),
      nameNative: generateRandomShits(10),
      description: generateRandomShits(80),
      descriptionNative: generateRandomShits(80),
      currency: '$',
      images: [
        {
          image:
            'https://content.api.news/v3/images/bin/8791f511b22d3b0abb8b52c575bff083?width=2048',
        },
      ],
      isActivated: false,
      schoolId: orgId,
    }
    const getResponse = await httpInstance._post(
      `/products_service/organizations/${orgId}/products`,
      payload
    )
    console.log(getResponse)
  }
}

main().catch(console.error)
