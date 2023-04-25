import { MysqlError } from "mysql"

import db from "../config"
import {
  sqlInsertAccount, sqlUpdateAccountStatus, sqlUpdateAccountName, sqlGetAccount,
} from '../sql/accountSql'
import { Account } from "../../model/entity/account"

/**
 * 数据库操作：新增账本
 * @param accountBook 
 * @returns 
 */
export const dbInsertAccount = async (account: Account): Promise<number | MysqlError> => {
  const { userId, accountId, accountName, accountStatus, accountDesc, createTime, updateTime, currencySign } = account
  const sqlParams = [userId, accountId, accountName, accountStatus, accountDesc, createTime, updateTime, currencySign]
  return new Promise((resolve, reject) => {
    db.query(sqlInsertAccount, sqlParams, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.affectedRows)
      }
    })
  })
}

/**
 * 数据库操作：修改账本状态
 * @param accountId 
 * @returns 
 */
export const dbUpdateAccountStatus = async (accountId: string, accountStatus: number): Promise<number | MysqlError> => {
  return new Promise((resolve, reject) => {
    db.query(sqlUpdateAccountStatus, [accountStatus, accountId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.affectedRows)
      }
    })
  })
}

/**
 * 数据库操作：修改账本名称
 * @param accountId 
 * @param newAccountName 
 * @returns 
 */
export const dbUpdateAccountName = async (accountId: string, newAccountName: string): Promise<number | MysqlError> => {
  return new Promise((resolve, reject) => {
    db.query(sqlUpdateAccountName, [newAccountName, accountId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.affectedRows)
      }
    })
  })
}

/**
 * 数据库操作：查询账本
 * @param userId 
 * @param accountStatus
 * @returns 
 */
export const dbGetAccount = async (userId: string, accountStatus: number): Promise<[]> => {
  return new Promise((resolve, reject) => {
    db.query(sqlGetAccount, [userId, accountStatus], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
