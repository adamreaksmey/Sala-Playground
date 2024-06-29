import Https from '../../../functions/http/http'

class LmsService {
  private readonly httpInstance: Https
  constructor(private readonly host: string | undefined) {
    this.httpInstance = new Https(this.host)
  }

  /**
   * Fetches single user progress from lms_user_progress table.
   * @param orgId 
   * @param courseId 
   * @param user 
   * @returns 
   */
  public async fetchUserProgress(orgId: string, courseId: string, user: any) {
    const { uniqueKey } = user
    const url = `/lms_service/organizations/${orgId}/users/${uniqueKey}/courses/${courseId}/progresses`

    const response = await this.httpInstance._get(url)
    return response
  }

  /**
   * Delete a single record from lms_user_progress table.
   * @param orgId 
   * @param courseId 
   * @param activityId 
   * @param user 
   * @returns 
   */
  public async deleteSingleUserProgess(
    orgId: string,
    courseId: string,
    activityId: any,
    user: any
  ) {
    const { userNumberId } = user
    const url = `/lms_service/organizations/${orgId}/courses/${courseId}/activities/${activityId}/${userNumberId}`

    const response = await this.httpInstance._delete(url)
    return response
  }
}

export default LmsService
