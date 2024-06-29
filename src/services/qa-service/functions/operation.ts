import Https from '../../../functions/http/http'

/**
 * Below are some of the useful functions to work
 * with qa service's data. again, this is not strict
 * so you can add more as many to your likings!
 *
 * This was used during my data synchronization and
 * data fixes.
 */

class QaOperation {
  constructor(private readonly host: string | undefined) {

  }
  /**
   * @param progressToRemove
   * @param allLearningPathIds
   * @param usersMappedByIdCard
   *
   * Remove user progress if no answers exist in qa
   * & Remove progress if progress no exist in learningPath.
   * 
   * It fetches the user's progress records from 
   */
  public async removeUserProgressV1(
    progressToRemove: any[],
    allLearningPathIds: any[],
    usersMappedByIdCard: Map<any, any>
  ): Promise<void> {
    
    const httpInstance = new Https(this.host)
    // for (const __I of progressToRemove) {
    //   const response = await getUserProgressRecords({
    //     idCard: __I.idCard,
    //   })
    //   console.log('Found user with their progress', response.length)
    //   for (const __J of response) {
    //     if (!allLearningPathIds.includes(__J.activityId)) {
    //       const deleteResponse = await deleteSingleUserProgress({
    //         activityId: __J.activityId,
    //         userNumberId: usersMappedByIdCard.get(__I.idCard).userNumberId,
    //       })
    //       console.log('Irrelevant Id found and deleted!', deleteResponse)
    //     }
    //   }
    //   console.log('Processing next user')
    // }
  }
}

export default QaOperation
