export class Account {
  readonly userId!: string
  readonly accountId!: string
  accountName!: string
  accountStatus!: number // 0 正常，1 回收站，2 软删除
  accountDesc!: string
  readonly createTime!: string
  updateTime!: string
  currencySign!: string

  constructor(userId: string, accountId: string, createTime: string) {
    this.userId = userId
    this.accountId = accountId
    this.createTime = createTime
  }
}

export class AccountLog {
  readonly accountId: string
  readonly accountLogId: string
  readonly accountLogDesc: string
  readonly createTime: string

  constructor(accountId: string, accountLogId: string, accountLogDesc: string, createTime: string) {
    this.accountId = accountId
    this.accountLogId = accountLogId
    this.accountLogDesc = accountLogDesc
    this.createTime = createTime
  }
}