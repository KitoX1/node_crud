import Router from 'express'

import BrandController from '../controllers/brandController.js'

const router = new Router()

router.post('/', BrandController.create)
router.get('/', BrandController.getAll)

export { router as brandRouter }
