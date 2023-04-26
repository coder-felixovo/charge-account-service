import express, { Router } from 'express'

import { addCurrencyService, getCurrencyService } from '../service/currencyService'

const router: Router = express.Router()

router.get('/r_currency', getCurrencyService)

router.post('/c_currency', addCurrencyService)

export default router