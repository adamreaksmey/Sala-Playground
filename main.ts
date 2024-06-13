import { fileURLToPath } from 'url'
import { dirname } from 'path'
// import { learningPath } from './RESERVED_DATA/production/RL2024/learningPath.js'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

type MainFunctionType = (__filename: string, __dirname: string) => Promise<void>

const main: MainFunctionType = async (__filename, __dirname) => {
  // Perform magic here :)
}

main(__filename, __dirname).catch(console.error)
