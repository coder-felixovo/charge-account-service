import mysql from 'mysql'

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "charge_account_wechat_mini",
  timezone: "SYSTEM"
})

export default db