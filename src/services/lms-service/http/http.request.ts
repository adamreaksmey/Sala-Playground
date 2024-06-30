import Https from '../../../functions/http/http'

class LmsService {
  protected readonly httpInstance: Https
  constructor(protected readonly host: string | undefined) {
    this.httpInstance = new Https(this.host)
  }

  /**
   * Say hello!
   * @param url
   * @returns
   */
  public async helloFromLms(url: string) {
    const response = await this.httpInstance._get(url)
    return response.data
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
    return response.data
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
    return response.data
  }

  /**
   * Creates a user's progress for a course.
   * It fetches the user's information from the course too.
   *
   * @param orgId
   * @param uniqueKey
   * @param courseId
   * @param activityId
   * @param payload
   * @returns
   */
  public async createUserProgress(
    orgId: string,
    uniqueKey: string,
    courseId: string,
    activityId: string,
    userNumberId: number
  ) {
    const courseUser = await this.getUserFromCourse(orgId, courseId, uniqueKey)
    const mainPayload = {
      progress: 'N/A',
      percentage: 100,
      isCompleted: true,
      userNumberId,
      courseUserId: courseUser.courseUserId,
    }
    const url = `/lms_service/organizations/${orgId}/users/${uniqueKey}/courses/${courseId}/activities/${activityId}/progresses`
    const response = await this.httpInstance._post(url, mainPayload)

    return response.data
  }

  /**
   * Self-explainatory
   * @param orgId
   * @param courseId
   * @param uniqueKey
   */
  public async getUserFromCourse(orgId: string, courseId: string, uniqueKey: string) {
    const url = `/lms_service/organizations/${orgId}/courses/${courseId}/users?limit=10&start=0&filters=[]&sort={%22progress%22:%22desc%22}&keyword=${uniqueKey}`
    const response = await this.httpInstance._get(url)

    return response.data
  }
}

export default LmsService
