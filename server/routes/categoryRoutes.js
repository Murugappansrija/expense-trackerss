import { Router } from "express";
import * as categoryController from '../controller/categoryController.js'
const router = Router()
router.delete('/:id',categoryController.deleteCategories)
router.post('/',categoryController.createCategory)
router.patch('/:id', categoryController.update)
export default router