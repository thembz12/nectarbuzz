const { addToCart, clearCart, updateCart, viewwCart } = require("../controllers/CartController")
const express = require ("express")

const router = express.Router()

router.post('/addtocart/:userID', addToCart)

router.get('/viewcart/:userID', viewwCart)

router.post('/updatecart', updateCart)

router.post('/clearcart', clearCart)




module.exports = router 