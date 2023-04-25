import Jwt from "jsonwebtoken"

const jwtSecret = 'felixovo'

export interface PayloadInterface {
  userId: string,
  sign?: string,
  iat?: number
  exp?: number
}

/**
 * 生成token
 * @param payload 
 * @param expires 单位：秒
 * @returns 
 */
export const createToken = (payload: string | object, expires: number): string => {
  return Jwt.sign(payload, jwtSecret, { expiresIn: expires })
}

/**
 * 验证token
 * @param token 
 * @returns 
 */
export const verifyToken = (token: string): boolean => {
  try {
    Jwt.verify(token, jwtSecret)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

/**
 * 获取token的payload
 * @param token 
 * @returns 
 */
export const getTokenPayload = (token: string) => {
  return <PayloadInterface>Jwt.decode(token)
}