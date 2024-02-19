import Router from 'express'

import TypeController from '../controllers/typeController.js'

const router = new Router()

router.post('/', TypeController.create)
router.get('/', TypeController.getAll)

export { router as typeRouter }