// 新增账本
export const sqlInsertAccount = `
INSERT into account
(user_id, account_id, account_name, account_status, account_desc, create_time, update_time, currency_sign)
VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`

// 修改账本状态
export const sqlUpdateAccountStatus = `
UPDATE account
SET account_status = ?
WHERE account_id = ?
`

// 修改账本名称
export const sqlUpdateAccountName = `
UPDATE account
SET account_name = ?
WHERE 
  account_id = ?
  AND account_status = 0
`

// 获取账本
export const sqlGetAccount = `
SELECT
  account_id as accountId,
  account_name as accountName,
  account_status as accountStatus,
  account_desc as accountDesc,
  create_time as createTime,
  update_time as updateTime,
  currency_sign as currency_sign
FROM
  account
WHERE 
  user_id = ?
  AND account_status = ?
`
