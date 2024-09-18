const { authorize, authenticate } = require("../middleware/authentication")
const { addToCart, clearCart,  reduceItemQuantity, increaseItemQuantity, removeItemFromCart, viewCart } = require("../controllers/CartController")
const express = require ("express")

const router = express.Router()

router.post('/addtocart/',authenticate, addToCart)

router.get('/viewcart/',authenticate, viewCart)

router.post('/updatecart', reduceItemQuantity)

router.post('/updatecart', increaseItemQuantity)

router.post('/updatecart', removeItemFromCart)

router.post('/clearcart', clearCart)




module.exports = router 