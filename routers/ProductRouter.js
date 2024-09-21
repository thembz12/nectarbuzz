const express = require ("express")
const { createProduct, getAll, getAllApprovedPost, getAllPendingPost, approvedProduct, getOne, deleteProduct, getAllHamper } = require("../controllers/ProductController")
const { authorize, isAdmin, authenticate } = require("../middleware/authentication")
const upload = require("../utils/multer")

const router = express.Router()


router.post("/FarmerID:/product-post/", authenticate, upload.single('productPicture'),createProduct)

router.get("/getone-product", getOne)

router.get("/getall-product", getAll)

router.get("/getall-harmperproduct", getAllHamper)

router.get("/getall-approved-product",authenticate, getAllApprovedPost)

router.get("/getall-pending-product", authenticate, getAllPendingPost)

router.delete("/delete-product/:productID", authorize, deleteProduct)

router.post("/approved-product/:productID",authorize, approvedProduct)


module.exports = router