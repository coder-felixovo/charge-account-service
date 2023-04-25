// 查询用户名
export const sqlSelectUsername = `
SELECT username FROM user WHERE username = ?
`

// 插入新的用户记录
export const sqlAddNewUser = `
INSERT INTO user(user_id, username, password, create_time, update_time) VALUES(?, ?, ?, ?, ?)
`

// 根据用户名查询用户信息
export const sqlSelectUserInfoByUsername = `
SELECT
	user_id as userId,
	username,
	password,
	create_time as createTime,
	update_time as updateTime
FROM user
WHERE username = ?
`

// 添加refresh token
export const sqlAddRefreshToken = `
INSERT INTO refresh_token(user_id, refresh_token) VALUES(?, ?)
`

// 根据user_id查询refresh token
export const sqlGetRefreshTokenByUserid = `
SELECT refresh_token as refreshToken FROM refresh_token WHERE user_id = ?
`

// 更新refresh token
export const sqlUpdateRefreshToken = `
UPDATE	refresh_token
SET refresh_token = ?
WHERE user_id = ?
`