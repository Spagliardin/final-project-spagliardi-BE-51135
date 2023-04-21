import { Router } from "express"
import { 
  createCart, getCarts,
  getCart,
  addProductToCart
} from "../controllers/carts.controller";

const router: Router = Router()

router.get( '/', getCarts )
router.post( '/', createCart )
router.get( '/:cid', getCart )
router.post( '/:cid/product/:pid', addProductToCart )

module.exports = router