// 查询货币类别
export const sqlSelectCurrency = `
SELECT
  currency_sign as currencySign,
  currency_name as currencyName,
  currency_country as currencyCountry,
  currency_flag_url as currencyFlagUrl
FROM
  currency
`

// 新增货币类别
export const sqlInsertCurrency = `
INSERT INTO currency(currency_sign, currency_name, currency_country, currency_flag_url)
VALUES(?, ?, ?, ?)
`