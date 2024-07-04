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
    const articlePayload = {
      slug: faker.lorem.slug(),
      title: faker.hacker.phrase(),
      titleNative: faker.hacker.phrase(),
      description: faker.finance.transactionDescription() || faker.commerce.productDescription(),
      descriptionNative: faker.finance.transactionDescription() || faker.commerce.productDescription(),
      author: faker.person.firstName(authorName[randomIndexBasedOnArray(authorName)]),
      authorAvatar: `https://randomuser.me/api/portraits/men/${randomNumberInRange}.jpg`,
      minutesRead: randomNumberInRange.toFixed(0),
      type: 'news',
      content: faker.lorem.paragraphs(10),
      contentNative: faker.lorem.paragraphs(10),
      subtitle: faker.lorem.sentence(),
      subtitleNative: faker.lorem.sentence(),
      publishedDate: '2024-07-04T14:48:31.350Z',
      status: 'active',
      startDate: faker.date.future().toISOString(),
      endDate: faker.date.future().toISOString(),
      metaTitle: faker.lorem.words(3),
      metaDescription: faker.lorem.sentence(),
      metaKeyword: faker.lorem.words(3).split(' ').join(', '),
      tags: faker.lorem.words(5).split(' '),
      featureImageLink: faker.image.avatar(),
      featureImage: faker.image.avatar(),
    }

    console.log(i)

    const articleCreation = await httpInstance._post(
      `/news_service/organizations/${pseOrgId}/articles`,
      articlePayload
    )

    console.log(articleCreation.data)
  }
}

main().catch(console.error)
