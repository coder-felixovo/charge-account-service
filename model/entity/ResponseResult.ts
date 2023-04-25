export class ResponseResult {
  status: number
  message: string
  data: object

  constructor() {
    this.status = 0
    this.message = ''
    this.data = {}
  }

}