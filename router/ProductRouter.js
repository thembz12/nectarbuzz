const express = require ("express")
const upload = require("../utils/multer")
const { createProduct } = require("../controller/ProductController")
const { authorize } = require("../middleware/authentication")
const router = express.Router()


router.post("/product-post/:FarmerID",upload.single("productPicture"),createProduct)

//router.get("/getall-product")







module.exports = router