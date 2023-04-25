import { describe, expect, test } from '@jest/globals'
import { isValidPassword } from "../../middleware/handler/user";

const validPasswordArr = [
  'a1234567',
  'a123456_',
  'a123456.',
  'a123456#',
  'a123456^',
]

const lenght1 = validPasswordArr.length

describe('valid password', () => {
  for (let i = 0; i < lenght1; i++) {
    test(`${validPasswordArr[i]}`, () => {
      expect(isValidPassword(validPasswordArr[i])).toBe(true)
    })
  }
})

const invalidPasswordArr = [
  '12345678',
  'abcdefgh',
  '1234567_',
  'abcdefg_',
  '123 abcde'
]

const length2 = invalidPasswordArr.length

describe('invalid password', () => {
  for (let i = 0; i < length2; i++) {
    test(`${invalidPasswordArr[i]}`, () => {
      expect(isValidPassword(invalidPasswordArr[i])).toBe(false)
    })
  }
})