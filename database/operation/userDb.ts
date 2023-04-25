import { OkPacket } from "mysql"

import db from "../config"
import { User } from "../../model/entity/user"
import {
  sqlSelectUsername, sqlAddNewUser, sqlSelectUserInfoByUsername, sqlAddRefreshToken, sqlGetRefreshTokenByUserid,
  sqlUpdateRefreshToken
} from '../sql/userSql'

/**
 * 数据库操作：查询用户名
 * @param username
 * @returns 
 */
export async function dbSelectUsername(username: string): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    db.query(sqlSelectUsername, username, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}

/**
 * 数据库操作：添加新的用户
 * @param user
 * @returns 
 */
export async function dbAddNewUser(user: User): Promise<OkPacket> {
  const { userId, username, password, createTime, updateTime } = user
  const sqlParams = [userId, username, password, createTime, updateTime]
  return new Promise((resolve, reject) => {
    db.query(sqlAddNewUser, sqlParams, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}

/**
 * 数据库操作：根据用户名查询用户信息
 * @param username
 * @returns 
 */
export async function dbSelectUserInfoByUsername(username: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    db.query(sqlSelectUserInfoByUsername, username, (error, results) => {
      if (error) {
        reject(error)
      } else {
        if (results.length === 0) {
          resolve(null)
        } else {
          const { userId, username, password, createTime, updateTime } = results[0]
          const user = new User(userId, username, password, createTime, updateTime)
          resolve(user)
        }
      }
    })
  })
}

/**
 * 数据库操作：添加refresh token
 * @param userId 
 * @param refreshToken 
 * @returns 
 */
export async function dbAddRefreshToken(userId: string, refreshToken: string): Promise<number> {
  return new Promise((resolve, reject) => {
    db.query(sqlAddRefreshToken, [userId, refreshToken], (error, resutls) => {
      if (error) {
        reject(error)
      } else {
        resolve(resutls.affectedRows)
      }
    })
  })
}

/**
 * 数据库操作：获取refresh token
 * @param userId 
 * @returns 
 */
export async function dbGetRefreshTokenByUserid(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    db.query(sqlGetRefreshTokenByUserid, userId, (error, results) => {
      if (error) {
        reject(error)
      } else {
        if (results.length === 0) {
          resolve("")
        } else {
          resolve(results[0].refreshToken)
        }
      }
    })
  })
}

/**
 * 数据库操作：更新refresh token
 * @param userId 
 * @param newRefreshToken 
 * @returns 
 */
export async function dbUpdateRefreshToken(userId: string, newRefreshToken: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const sqlParams = [userId, newRefreshToken]
    db.query(sqlUpdateRefreshToken, sqlParams, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.affectedRows)
      }
    })
  })
}