import Router from 'express'

import UserController from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)

export { router as userRouter }