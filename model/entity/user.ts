export class User {
  readonly userId: string
  readonly username: string
  password: string
  readonly createTime: string
  updateTime: string

  constructor(userId: string, username: string, password: string, createTime: string, updateTime?: string) {
    this.userId = userId
    this.username = username
    this.password = password
    this.createTime = createTime
    this.updateTime = updateTime || createTime
  }
}
