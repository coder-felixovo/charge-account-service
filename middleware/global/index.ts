import { RequestHandler, Request, Response, NextFunction } from "express";

import { ResponseResult } from '../../model/entity/ResponseResult'
import { dbGetRefreshTokenByUserid } from '../../database/operation/userDb'
import { verifyToken, getTokenPayload, createToken } from "../../utils/jwt";

// 无需身份校验接口
const noAuthPass = ['/yzm', '/register', '/login', '/verify_token']

/**
 * 全局中间件：路由拦截
 * @param req 
 * @param res 
 * @param next 
 */
export const routerInterceptor: RequestHandler = async function (req: Request, res: Response, next: NextFunction) {
  // 实例化一次返回的响应结果，在后续的路由中间件和路由中都使用这个实例
  const responseResult: ResponseResult = new ResponseResult()
  req.body.responseResult = responseResult
  if (noAuthPass.includes(req.path)) {
    // 无需身份认证的路由
    next()
  } else {
    // 登录状态校验
    const authorization = req.headers.authorization
    if (authorization) {
      const validAccessToken = verifyToken(authorization)
      const { userId } = getTokenPayload(authorization)
      if (validAccessToken) {
        req.body.userId = userId
        next()
      } else {
        // access token过期
        // 查询refresh_token并验证有效期
        const refreshToken: string = await dbGetRefreshTokenByUserid(userId)
        const validRefreshToken = verifyToken(refreshToken)
        if (validRefreshToken) {
          const newAccessToken = createToken({ userId, sign: 'access' }, 86400)
          responseResult.data = { newAccessToken }
          res.send(responseResult)
        } else {
          responseResult.status = 401
          responseResult.message = '过期，请重新登录'
          res.send(responseResult)
        }
      }
    } else {
      responseResult.message = '请先登录'
      responseResult.status = 401
      res.send(responseResult)
    }
  }
}