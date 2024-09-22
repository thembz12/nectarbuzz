const { authorize, authenticate, authenticateUser } = require("../middleware/authentication")
const { addToCart, clearCart,  reduceItemQuantity, increaseItemQuantity, removeItemFromCart, viewCart } = require("../controllers/CartController")
const express = require ("express")

const router = express.Router()

router.post('/addtocart/',authenticateUser, addToCart)

router.get('/viewcart',authenticateUser, viewCart)

router.put('/reducecartitem', authenticateUser,reduceItemQuantity)

router.put('/increasecartitem',authenticateUser, increaseItemQuantity)

router.delete('/removecartitem',authenticateUser, removeItemFromCart)

router.delete('/clearcart',authenticateUser, clearCart)




module.exports = router 