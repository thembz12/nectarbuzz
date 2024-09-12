const express = require ("express")
const { createProduct, getAll, getAllApprovedPost, getAllPendingPost, approvedProduct, getOne } = require("../controllers/ProductController")
const { authorize, isAdmin } = require("../middleware/authentication")
const router = express.Router()


router.post("/:farmerID/product-post/:categoryID",createProduct)

router.get("/getone-product", getOne)

router.get("/getall-product", getAll)

router.get("/getall-approved-product",isAdmin, getAllApprovedPost)

router.get("/getall-pending-product",isAdmin, getAllPendingPost)

router.get("/approved-product",isAdmin, approvedProduct)


module.exports = router