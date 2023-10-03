import { Router } from "express";
import * as categoryController from '../controller/categoryController.js'
const router = Router()
router.delete('/:id',categoryController.deleteCategories)
export default router