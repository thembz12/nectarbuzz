const { authorize, authenticate } = require("../middleware/authentication")
const { addToCart, clearCart,  reduceItemQuantity, increaseItemQuantity, removeItemFromCart, viewCart } = require("../controllers/CartController")
const express = require ("express")

const router = express.Router()

router.post('/addtocart/',authenticate, addToCart)

router.get('/viewcart',authenticate, viewCart)

router.put('/reducecartitem', reduceItemQuantity)

router.put('/increasecartitem', increaseItemQuantity)

router.delete('/removecartitem',authenticate, removeItemFromCart)

router.delete('/clearcart', clearCart)




module.exports = router 