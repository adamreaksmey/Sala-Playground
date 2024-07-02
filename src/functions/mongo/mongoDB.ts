import { MongoClient, InsertManyResult } from 'mongodb'
type MongoInterface = Promise<InsertManyResult<Document> | undefined>
class Mongo {
  private readonly Client: MongoClient
  constructor(private readonly uri: string) {
    this.Client = new MongoClient(uri)
  }

  public async mongoInsertMany(
    inputCollection: any[],
    databaseName: string,
    collectionName: string
  ): MongoInterface {
    try {
      await this.Client.connect()
      console.log('mongo connected')

      const database = this.Client.db(databaseName)
      const collection = database.collection(collectionName)

      const result = await collection.insertMany(inputCollection)
      // const result = await collection.deleteMany({ layout: { $exists: true } })

      return result
    } catch (error) {
      console.log(error)
    } finally {
      await this.Client.close()
    }
  }
}

export default Mongo
