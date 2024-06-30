import dotenv from 'dotenv'
import LmsService from './services/lms-service/http/http.request'
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
  const instance = new LmsService(process.env.SMS_URL_DEV)
  const response = await instance.helloFromLms('/products_service')
}

main().catch(console.error)
