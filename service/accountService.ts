import { randomUUID } from 'crypto'
import { RequestHandler, Request, Response } from 'express'

import {
  dbInsertAccount, dbUpdateAccountStatus, dbUpdateAccountName, dbGetAccount
} from '../database/operation/accountDb'
import { Account } from '../model/entity/account'
import { formatDateTime } from '../utils/time'

/**
 * 新建账本
 * @param req 
 * @param res 
 * @returns 
 */
export const createAccountService: RequestHandler = async (req: Request, res: Response) => {
  const { userId, accountName, accountDesc, currencySign, responseResult } = req.body
  if (!accountName) {
    responseResult.status = -2001
    responseResult.message = '创建账本失败，参数无效'
    return res.send(responseResult)
  }
  const accountId = randomUUID().split('-').join('')
  const createTime = formatDateTime()
  const updateTime = createTime
  const account = new Account(userId, accountId, createTime)
  account.accountName = accountName
  account.accountStatus = 0
  account.accountDesc = accountDesc
  account.updateTime = updateTime
  account.currencySign = currencySign || 'CNY'
  try {
    const result = await dbInsertAccount(account)
    if (result > 0) {
      responseResult.status = 2001
      responseResult.message = '成功创建账本'
      responseResult.data.newAccount = account
      res.send(responseResult)
    } else {
      responseResult.status = -2001
      responseResult.message = '创建账本失败'
      res.send(responseResult)
    }
  } catch (e) {
    responseResult.status = -2001
    responseResult.message = '创建账本失败，缺少必要的参数'
    res.send(responseResult)
  }
}

/**
 * 将账本移入回收站
 * @param req 
 * @param res 
 * @returns 
 */
export const moveAccountBinService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult, accountId } = req.body
  try {
    // 将 account_status 设置为 -1 表示 处于回收站
    const result = await dbUpdateAccountStatus(accountId, -1)
    if (result > 0) {
      responseResult.status = 2002
      responseResult.message = '将账本移入回收站成功'
      responseResult.data = {
        accountId,
        newAccountStatus: -1
      }
      res.send(responseResult)
    } else {
      responseResult.status = -2002
      responseResult.message = '将账本移入回收站失败，参数无效'
      res.send(responseResult)
    }
  } catch (e) {
    responseResult.status = -2002
    responseResult.message = '将账本移入回收站失败，缺少必要的参数'
    res.send(responseResult)
  }
}

/**
 * 软删除账本
 * @param req 
 * @param res 
 * @returns 
 */
export const softDeleteAccountService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult, accountId } = req.body
  try {
    // 将 account_status 设置为 -3 表示 软删除账本
    const result = await dbUpdateAccountStatus(accountId, -3)
    if (result > 0) {
      responseResult.status = 2003
      responseResult.message = '删除账本成功'
      res.send(responseResult)
    } else {
      responseResult.status = -2003
      responseResult.message = '删除账本失败，参数无效'
      res.send(responseResult)
    }
  } catch (e) {
    responseResult.status = -2003
    responseResult.message = '删除账本失败，缺少必要的参数'
    res.send(responseResult)
  }
}

/**
 * 修改账本名称
 * @param req 
 * @param res 
 */
export const updateAccountNameService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult, accountId, newAccountName } = req.body
  try {
    const result = await dbUpdateAccountName(accountId, newAccountName)
    if (result > 0) {
      responseResult.status = 2004
      responseResult.message = '修改账本名称成功'
      responseResult.data = {
        accountId,
        newAccountName
      }
      res.send(responseResult)
    } else {
      responseResult.status = -2004
      responseResult.message = '修改账本名称失败，参数无效'
      res.send(responseResult)
    }
  } catch (e) {
    responseResult.status = -2004
    responseResult.message = '修改账本名称失败，缺少必要的参数'
    res.send(responseResult)
  }
}

/**
 * 获取正常状态下的账本
 * @param req 
 * @param res 
 */
export const getNormalAccount: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult, userId } = req.body
  try {
    const result = await dbGetAccount(userId, 0)
    const length = result.length
    responseResult.status = 2005
    const message = '获取账本成功'
    responseResult.message = length === 0 ? message + '，但是该账户未创建任何账本' : message
    responseResult.data = result
    res.send(responseResult)
  } catch (e) {
    responseResult.status = -2005
    responseResult.message = '获取账本失败，缺少必要的参数'
    res.send(responseResult)
  }
}
