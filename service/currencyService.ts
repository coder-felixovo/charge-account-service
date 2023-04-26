import { RequestHandler, Request, Response } from 'express'
import { dbInsertCurrency, dbSelectCurrency } from '../database/operation/currencyDb'
import { Currency } from '../model/entity/currency'

/**
 * 获取货币类别
 * @param req 
 * @param res 
 */
export const getCurrencyService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult } = req.body
  try {
    const result = await dbSelectCurrency()
    responseResult.status = 2101
    responseResult.message = '获取货币类别成功'
    responseResult.data = result
    res.send(result)
  } catch (e) {
    responseResult.status = -2101
    responseResult.message = "获取货币类别失败，缺少必要的参数"
    res.send(responseResult)
  }
}

/**
 * 添加货币类别
 * @param req 
 * @param res 
 */
export const addCurrencyService: RequestHandler = async (req: Request, res: Response) => {
  const { responseResult, currencySign, currencyName, currencyCountry } = req.body
  try {
    const currency = new Currency(currencySign, currencyName, currencyCountry)
    const result = await dbInsertCurrency(currency)
    if (result > 0) {
      responseResult.status = 2102
      responseResult.message = "添加货币类别成功"
      res.send(responseResult)
    }
  } catch (e) {
    responseResult.status = -2102
    responseResult.message = "添加货币类别失败，缺少必要的参数，或者参数无效"
    res.send(responseResult)
  }
}