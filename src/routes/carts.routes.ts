import { Router } from "express"
import { 
  createCart, getCarts,
  getCart,
  addProductToCart,
  deleteProductToCart,
  deleteAllCart,
  modifyQuantity
} from "../controllers/carts.controller";

const router: Router = Router()

router.get( '/', getCarts )
router.get( '/:cid', getCart )
router.post( '/', createCart )
router.post( '/:cid/product/:pid', addProductToCart )
router.put( '/:cid/product/:pid', modifyQuantity )
router.delete('/:cid/product/:pid', deleteProductToCart )
router.delete( '/:cid', deleteAllCart )

module.exports = router