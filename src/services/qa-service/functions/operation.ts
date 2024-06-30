import Https from '../../../functions/http/http'
import LmsService from '../../lms-service/http/http.request'

/**
 * Below are some of the useful functions to work
 * with qa service's data. again, this is not strict
 * so you can add more as many to your likings!
 *
 * This was used during my data synchronization and
 * data fixes.
 */

class QaOperation {
  private lmsInstance: LmsService
  constructor(private readonly host: string | undefined) {
    this.lmsInstance = new LmsService(this.host)
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
    usersMappedByIdCard: Map<any, any>,
    orgId: string,
    courseId: string
  ): Promise<void> {
    for (const __I of progressToRemove) {
      const response = await this.lmsInstance.fetchUserProgress(
        orgId,
        courseId,
        __I.idCard
      )
      for (const __J of response) {
        if (!allLearningPathIds.includes(__J.activityId)) {
          const deleteResponse = await this.lmsInstance.deleteSingleUserProgess(
            orgId,
            courseId,
            __J.activityId,
            usersMappedByIdCard.get(__I.idCard).userNumberId
          )
          console.log('Irrelevant Id found and deleted!', deleteResponse)
        }
      }
      console.log('Processing next user')
    }
  }
}

export default QaOperation
