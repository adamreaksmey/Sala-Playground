import { learningPath } from "./services/lms-service/RESERVED_DATA/production/RL2024/learningPath"

type MainFunctionType = () => Promise<void>

const main: MainFunctionType = async () => {
  // Perform magic here :)
  console.log('hello world')
  console.log(learningPath)
}

main().catch(console.error)
