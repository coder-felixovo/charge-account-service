import { describe, expect, test } from '@jest/globals'
import { isValidUsername } from "../../middleware/handler/user";


const validUsernameArr = [
  '123456',
  '1234567890',
]

const length1 = validUsernameArr.length

describe('valid username', () => {
  for (let i = 0; i < length1; i++) {
    test(`${validUsernameArr[i]}`, () => {
      expect(isValidUsername(validUsernameArr[i])).toBe(true)
    })
  }
})

const invalidUsernameArr = [
  '12345', // 字符数少于6
  '12345678901', // 字符数大于10
  // 含有除数字以外字符
  '12345a',
  '12345_',
  '12345*',
]

const length2 = invalidUsernameArr.length

describe('invalid username', () => {
  for (let i = 0; i < length2; i++) {
    test(`${invalidUsernameArr[i]}`, () => {
      expect(isValidUsername(invalidUsernameArr[i])).toBe(false)
    })
  }
})
