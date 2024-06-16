import * as fs from 'fs'

class DynamoFormatter {
  constructor() {}

  formatDynamoDBJson(inputFilename: string, outputFilename: string) {
    let contents: any = []
    try {
      console.log('Correcting your dynamoJSON file to proper json :) ')
      let content: string = fs.readFileSync(inputFilename, { encoding: 'utf8' })
      // Replace all instances of "}\n" with "},\n" to separate the objects correctly
      let formattedContent: string = content.replace(/\}\n/g, '},\n')

      // Remove any trailing comma which may exist after the last JSON object
      formattedContent = formattedContent.replace(/,\n$/, '\n')

      // Enclose the entire content within square brackets to form a valid JSON array
      if (!formattedContent.startsWith('[') || !formattedContent.endsWith(']')) {
        formattedContent = `[${formattedContent.trim().replace(/,$/, '')}]`
      }

      contents = formattedContent
      // Save the formatted content to a new file
      fs.writeFileSync(outputFilename, formattedContent, { encoding: 'utf8' })
      console.log('File has been successfully corrected & formatted and saved.')

      return contents
    } catch (error: unknown | any) {
      if (error.code === 'ENOENT') {
        console.log(`File ${inputFilename} not found.`)
      } else {
        console.log(`An error occurred: ${error}`)
      }
    }
    return false
  }
}
