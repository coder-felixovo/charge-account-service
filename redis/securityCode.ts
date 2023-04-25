import { randomUUID } from 'crypto'

import redis from './start'
import { SecurityCode } from '../model/entity/SecurityCode'

/**
 * 生成6位数字验证码，存入redis，并返回验证码
 * @param expires 验证码过期时间，单位seconds，默认60。
 * @returns SecurityCode
 */
export const createSecurityCode = async (expires = 60): Promise<SecurityCode> => {
  const _expires = expires
  const _securityCode = (Math.random() * 1000000).toFixed(0)
  const _securityCodeKey = randomUUID().slice(0, 10)
  await redis.set(_securityCodeKey, _securityCode)
  await redis.expire(_securityCodeKey, expires)
  const securityCode = new SecurityCode(_securityCodeKey, _securityCode, _expires)
  return securityCode
}

