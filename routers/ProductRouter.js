const express = require ("express")
const { createProduct } = require("../controllers/ProductController")
const { authorize } = require("../middleware/authentication")
const router = express.Router()


router.post("/:farmerID/product-post/:categoryID",createProduct)

//router.get("/getall-product")







module.exports = router