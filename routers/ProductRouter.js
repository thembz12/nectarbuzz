const express = require ("express")
const { createProduct, getAll, getAllApprovedPost, getAllPendingPost, approvedProduct, getOne } = require("../controllers/ProductController")
const { authorize, isAdmin, authenticate } = require("../middleware/authentication")
const upload = require("../utils/multer")

const router = express.Router()


router.post("/:farmerID/product-post/:categoryID", upload.single('productPicture'),createProduct)

router.get("/getone-product", getOne)

router.get("/getall-product", getAll)

router.get("/getall-approved-product",authenticate, getAllApprovedPost)

router.get("/getall-pending-product",authorize, getAllPendingPost)

router.post("/approved-product/:productID",authorize, approvedProduct)


module.exports = router