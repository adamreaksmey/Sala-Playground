import dotenv from 'dotenv'
import Https from './functions/http/http'
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
  const httpInstance = new Https(process.env.SMS_URL_STAGING)
  // const enrollStudent = 
}

main().catch(console.error)
