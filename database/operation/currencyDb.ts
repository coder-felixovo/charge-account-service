import { MysqlError } from "mysql"

import db from "../config"
import { Currency } from "../../model/entity/currency"
import { sqlInsertCurrency, sqlSelectCurrency } from '../sql/currencySql'

/**
 * 数据库操作：查询货币类别
 * @returns 
 */
export const dbSelectCurrency = async (): Promise<[] | MysqlError> => {
  return new Promise((resolve, reject) => {
    db.query(sqlSelectCurrency, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}

/**
 * 数据库操作：新增货币类别
 * @returns 
 */
export const dbInsertCurrency = async (currency: Currency): Promise<number | MysqlError> => {
  return new Promise((resolve, reject) => {
    const { currencySign, currencyName, currencyCountry, currencyFlagUrl } = currency
    const sqlParams = [currencySign, currencyName, currencyCountry, currencyFlagUrl]
    db.query(sqlInsertCurrency, sqlParams, (error, results) => {
      error ? reject(error) : resolve(results.affectedRows)
    })
  })
}