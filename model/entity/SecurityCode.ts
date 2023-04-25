export class SecurityCode {
  securityCodeKey: string
  securityCode: string
  expires: number

  constructor(key: string, code: string, expires: number) {
    this.securityCodeKey = key
    this.securityCode = code
    this.expires = expires
  }
}