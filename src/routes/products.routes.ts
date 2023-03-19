import { Router } from "express";
import { getProducts, getProductById, createProduct } from "../controllers/products.controller"

const router: Router = Router()

router.get( '/', getProducts )
router.get( '/:pid', getProductById )
router.post( '/',  )

module.exports = router