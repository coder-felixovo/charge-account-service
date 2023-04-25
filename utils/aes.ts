import CryptoJS from 'crypto-js'

export const aesKey = '123456'

/**
 * AES加密
 * @param text 
 * @returns 
 */
export const encryptPlainText = (text: string): string => {
  return CryptoJS.AES.encrypt(text, aesKey).toString()
}

/**
 * AES解密
 * @param cipher
 * @returns 
 */
export const decryptCipherText = (cipher: string): string => {
  return CryptoJS.AES.decrypt(cipher, aesKey).toString(CryptoJS.enc.Utf8)
}
