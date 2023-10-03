import transactionRoutes from './transaction.js'
import authenticationRoutes from './auth.js'
import UserApi from './UserApi.js'
import { Router } from 'express'
const router = Router()


router.use('/transaction', transactionRoutes)
router.use('/auth', authenticationRoutes)
router.use('/user',UserApi)

export default router