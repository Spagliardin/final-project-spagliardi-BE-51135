import { Router } from "express"
import { createCart, getCart, addProductToCart } from "../controllers/carts.controller";

const router: Router = Router()


router.post( '/', createCart )
router.get( '/:cid', getCart )
router.post( '/:cid/product/:pid', addProductToCart )

module.exports = router