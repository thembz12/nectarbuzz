const { addToCart, clearCart, updateCart, viewwCart } = require("../controller/CartController")

const router = express.Router()

router.post('/addtocart', addToCart)

router.post('/viewcart', viewwCart)

router.post('/updatecart', updateCart)

router.post('/clearcart', clearCart)




module.exports = router