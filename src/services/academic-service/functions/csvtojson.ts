import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import Https from '../../../functions/http/http'

export const csvToJson = async (filePath: string) => {
  const csvToJsonUrl = 'https://www.convertcsv.io'
  const path = '/api/v1/csv2json/'
  // Replace with your file path and token
  const token: string = '5498a17787c67a0ecd8e17650af12b11b705f5d2'

  // Initializing formData
  const formData: FormData = new FormData()
  formData.append('infile', fs.createReadStream(filePath))
  const headers = {
    Authorization: `Token ${token}`,
    ...formData.getHeaders(),
  }

  // Perform the POST request using Axios
  const instance = new Https(csvToJsonUrl)
  const response = await instance._post(path, formData, headers)

  return response.data
}
