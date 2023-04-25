import express, { Router } from 'express'

import {
  mwCheckSecurityCode, mwCheckUsernameValid, mwCheckPasswordValid, mwCheckUsernameRegistered, mwCompareLoginInfo,
  mwCheckRefreshToken
} from '../middleware/service/userMw'
import {
  createSecurityCodeService, registerService, loginService
} from '../service/userService'

const router: Router = express.Router()

const registerMw = [mwCheckSecurityCode, mwCheckUsernameValid, mwCheckUsernameRegistered, mwCheckPasswordValid]
const loginMw = [mwCompareLoginInfo, mwCheckRefreshToken]

router.use('/register', registerMw)
router.use('/login', loginMw)

router.get('/yzm', createSecurityCodeService)
router.post('/register', registerService)
router.post('/login', loginService)

export default router