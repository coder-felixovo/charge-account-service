import { Request, Response, NextFunction, RequestHandler } from 'express'

import redis from '../../redis/start'
import {
  dbSelectUsername, dbSelectUserInfoByUsername, dbGetRefreshTokenByUserid, dbAddRefreshToken, dbUpdateRefreshToken
} from '../../database/operation/userDb'
import { isValidPassword, isValidUsername } from '../handler/user'
import { decryptCipherText } from '../../utils/aes'
import { createToken, PayloadInterface, verifyToken } from '../../utils/jwt'

/**
 * 检查验证码是否正确
 * @param req 
 * @param res 
 * @param next 
 */
export const mwCheckSecurityCode: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { securityCodeKey, securityCode, responseResult } = req.body
  redis.get(securityCodeKey)
    .then(value => {
      redis.del(securityCodeKey)
      if (value === securityCode) {
        next()
      } else {
        responseResult.status = -1001
        responseResult.message = '验证码错误'
        res.send(responseResult)
      }
    })
}

/**
 * 检查用户名是否有效
 * @param req 
 * @param res 
 * @param next 
 */
export const mwCheckUsernameValid: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { username, responseResult } = req.body
  const validUsername: boolean = isValidUsername(username)
  if (validUsername) {
    next()
  } else {
    responseResult.status = -1002
    responseResult.message = '无效的用户名，要求6 ~ 10位纯数字'
    res.send(responseResult)
  }
}

/**
 * 检查用户名是否已注册
 * @param req 
 * @param res 
 * @param next 
 */
export const mwCheckUsernameRegistered: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { username, responseResult } = req.body
  const result: Array<any> = await dbSelectUsername(username)
  if (result.length === 0) {
    // 用户名可以注册
    next()
  } else {
    responseResult.status = -1002
    responseResult.message = '用户名已存在，请换一个'
    res.send(responseResult)
  }
}

/**
 * 检查密码是否有效
 * @param req 
 * @param res 
 * @param next 
 */
export const mwCheckPasswordValid: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { password, responseResult } = req.body
  const validPassword: boolean = isValidPassword(password)
  if (validPassword) {
    next()
  } else {
    responseResult.operation = '验证密码'
    responseResult.status = -1002
    responseResult.message = '无效的密码，8 ~ 16位字符，至少包含数字和小写字母'
    res.send(responseResult)
  }
}


/**
 * 比较登录信息
 * @param req 
 * @param res 
 * @param next 
 */
export const mwCompareLoginInfo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, responseResult } = req.body
  const user = await dbSelectUserInfoByUsername(username)
  if (!user) {
    responseResult.message = '登录失败，该账户未注册'
    responseResult.status = -1003
    return res.send(responseResult)
  }
  const { userId, password: pwd } = user
  const correctPassword = decryptCipherText(pwd) === password
  if (correctPassword) {
    req.body.userId = userId
    next()
  } else {
    responseResult.message = '登录失败，密码错误'
    responseResult.status = -1003
    res.send(responseResult)
  }
}

/**
 * 检查refresh token
 * @param req 
 * @param res 
 * @param next 
 */
export const mwCheckRefreshToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { responseResult, userId } = req.body
  // 先查询refresh token并验证是否过期
  try {
    // 1. 无refresh token -> 添加新的refresh token至数据库
    // 2. 有refresh toekn -> 验证是否有效
    const refreshToken: string = await dbGetRefreshTokenByUserid(userId)
    const tokenPayload: PayloadInterface = { userId }
    const newRefreshToken = createToken(tokenPayload, 86400 * 7)
    if (!refreshToken) {
      try {
        // 将生成的refresh token添加至数据库
        const affectedRows: number = await dbAddRefreshToken(userId, newRefreshToken)
        if (affectedRows > 0) {
          next()
        }
      } catch (e) {
        responseResult.status = -1003
        responseResult.message = '登录失败，服务器跑路了'
        res.send(responseResult)
      }
    } else {
      const isValid: boolean = verifyToken(refreshToken)
      // 1. 有效 -> 放行
      // 2. 无效 -> 更新refresh token -> 放行
      if (isValid) {
        next()
      } else {
        try {
          const affectedRows: number = await dbUpdateRefreshToken(userId, newRefreshToken)
          if (affectedRows > 0) {
            next()
          }
        } catch (e) {
          responseResult.status = -1003
          responseResult.message = '登录失败，服务器跑路了'
          res.send(responseResult)
        }
      }
    }
  } catch (e) {
    responseResult.status = -1003
    responseResult.message = '登录失败，服务器跑路了'
    res.send(responseResult)
  }
}


