import Https from '../../../functions/http/http'

class LmsService {
  constructor(private readonly host: string | undefined) {}

  public async fetchUserProgress(orgId: string, courseId: string, user: any) {
    const { uniqueKey } = user
    const httpInstance: Https = new Https(this.host)
    const url = `/lms_service/organizations/${orgId}/users/${uniqueKey}/courses/${courseId}/progresses`

    const response = await httpInstance._get(url)
    return response
  }

  public async deleteSingleUserProgess(
    orgId: string,
    courseId: string,
    activityId: any,
    user: any
  ) {
    const { userNumberId } = user
    const httpInstance: Https = new Https(this.host)
    const url = `/lms_service/organizations/${orgId}/courses/${courseId}/activities/${activityId}/${userNumberId}`

    const response = await httpInstance._delete(url)
    return response
  }
}

export default LmsService
