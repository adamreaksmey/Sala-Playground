import dotenv from 'dotenv'
import axios from 'axios'
import path, { dirname } from 'path'
import * as fs from 'fs'
import FormData from 'form-data' // Import FormData from the form-data package
import { fileURLToPath } from 'url'

dotenv.config()

type MainFunctionType = () => Promise<void>
const ORGID = '27c0b377-f28e-4ba1-afb9-5eaed02fee6c'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const formData = new FormData()
formData.append('name', '::testing::')
formData.append('extension', 'png')
formData.append('parent_id', ORGID)

const filePath = path.join(__dirname, '../ramanujan.png')
formData.append('file', fs.createReadStream(filePath))

const main: MainFunctionType = async () => {
  try {
    for (let i = 0; i < 100; i++) {
      const formData = new FormData() // Recreate formData for each iteration
      formData.append('file', fs.createReadStream('ramanujan.png')) // Example file
      formData.append('name', '::testing::')
      formData.append('extension', 'png')
      formData.append('parent_id', '27c0b377-f28e-4ba1-afb9-5eaed02fee6c')

      const response = await axios({
        baseURL: 'http://127.0.0.1:8000',
        url: `/api/products_service/${ORGID}/upload`,
        method: 'POST',
        data: formData,
        headers: formData.getHeaders(),
      })

      console.log('response', response.data)
    }
  } catch (error) {
    console.error('Error during the request loop:', error)
  }
}

main().catch(console.error)
