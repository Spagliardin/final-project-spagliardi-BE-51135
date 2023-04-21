import { Router } from "express"
import { 
  createCart, getCarts,
  getCart,
  addProductToCart,
  deleteProductToCart,
  updateCart
} from "../controllers/carts.controller";

const router: Router = Router()

router.get( '/', getCarts )
router.post( '/', createCart )
router.get( '/:cid', getCart )
router.post( '/:cid/product/:pid', addProductToCart )
router.delete('/:cid/product/:pid', deleteProductToCart )
router.put( '/:cid', updateCart )

module.exports = router