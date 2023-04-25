import { randomUUID } from 'crypto'
import { RequestHandler, Request, Response } from 'express'

import { SecurityCode } from '../model/entity/SecurityCode'
import { User } from '../model/entity/user'
import { createSecurityCode } from '../redis/securityCode'
import { dbAddNewUser } from '../database/operation/userDb'
import { encryptPlainText } from '../utils/aes'
import { formatDateTime } from '../utils/time'
import { createToken, PayloadInterface } from '../utils/jwt'

/**
 * 获取验证码
 * @param req 
 * @param res 
 */
export const createSecurityCodeService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult } = req.body
  const securityCode: SecurityCode = await createSecurityCode()
  responseResult.status = 1001
  responseResult.data = securityCode
  res.send(responseResult)
}

/**
 * 注册
 * @param req 
 * @param res 
 */
export const registerService: RequestHandler = async (req: Request, res: Response) => {
  const { username, password, responseResult } = req.body
  const userId = randomUUID().split('-').join('')
  const encryptPassword = encryptPlainText(password)
  const createTime = formatDateTime()
  const newUser = new User(userId, username, encryptPassword, createTime)
  try {
    const result = await dbAddNewUser(newUser)
    if (result.affectedRows === 1) {
      responseResult.message = '注册成功'
      responseResult.status = 1002
      res.send(responseResult)
    }
  } catch (e) {
    responseResult.message = '注册失败，系统跑路了'
    responseResult.status = -1002
    res.send(responseResult)
  }
}

/**
 * 登录
 * @param req 
 * @param res 
 */
export const loginService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult, userId } = req.body
  const tokenPayload: PayloadInterface = { userId, sign: 'access' }
  const newAccessToken = createToken(tokenPayload, 86400)
  responseResult.status = 1003
  responseResult.message = '登录成功'
  responseResult.data = { accessToken: newAccessToken }
  res.send(responseResult)
}