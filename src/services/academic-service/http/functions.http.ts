import Https from '../../../functions/http/http'

class Academic {
  private readonly httpInstance: Https
  constructor(private readonly host: string | undefined) {
    this.httpInstance = new Https(this.host)
  }

  public async enrollStudent(student: any, schoolId: string, campusId: string) {
    const response = this.httpInstance._post(
      `/academic_service/schools/${schoolId}/campus/${campusId}/students`,
      student
    )

    return response
  }
}

export default Academic
