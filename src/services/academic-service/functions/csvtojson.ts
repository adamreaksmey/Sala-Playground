import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import Https from '../../../functions/http/http'

const csvToJsonUrl = 'https://www.convertcsv.io'
const path = '/api/v1/csv2json/'
// Replace with your file path and token
const filePath: string = '[YOUR FILE]'
const token: string = '[YOUR TOKEN]'

// Initializing formData
const formData = new FormData()
formData.append('infile', fs.createReadStream(filePath))

// Perform the POST request using Axios
const instance = new Https(csvToJsonUrl)
const response = await instance._post(path, formData)
