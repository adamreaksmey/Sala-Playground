import dotenv from 'dotenv'
dotenv.config()

import Https from './functions/http/http'
type MainFunctionType = () => Promise<void>
const main: MainFunctionType = async () => {
  
}

main().catch(console.error)
