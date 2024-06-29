import Https from '../../../functions/http/http'

class LmsService {
  protected readonly httpInstance: Https
  constructor(protected readonly host: string | undefined) {
    this.httpInstance = new Https(this.host)
  }
}

export default LmsService
