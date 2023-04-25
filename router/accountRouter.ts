import express, { Router } from 'express'

import {
  createAccountService, moveAccountBinService, softDeleteAccountService, updateAccountNameService, getNormalAccount,
} from '../service/accountService'

const router: Router = express.Router()

router.post('/c_account', createAccountService)
router.post('/u_account_bin', moveAccountBinService)
router.post('/u_account_del', softDeleteAccountService)
router.post('/u_account_name', updateAccountNameService)

router.get('/r_account_normal', getNormalAccount)

export default router