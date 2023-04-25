// 用户名规则：6 ~ 10位纯数字
const usernameRule = /^\d{6,10}$/

// 密码规则：8 ~ 16位字符，至少包含数字和小写字母
const passwordRule = /^(?=.*\d)(?=.*[a-z])[^\s]{8,16}$/

export function isValidUsername(username: string): boolean {
  return usernameRule.test(username)
}

export function isValidPassword(password: string): boolean {
  return passwordRule.test(password)
}