import Https from '../../../functions/http/http'

class Applicant {
  private readonly httpInstance: Https
  constructor(private readonly host: string | undefined) {
    this.httpInstance = new Https(this.host)
  }

  public async registerApplicant(student: any, schoolId: string) {
    const response = this.httpInstance._post(
      `/applicant_service/schools/${schoolId}/applicants`,
      student
    )

    return response
  }
}

export default Applicant
