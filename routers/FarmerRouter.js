
const { loginUser, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, logOut, farmerSignUp, updateUser, uploadDP} = require("../controllers/FarmerController")
const { authorize, isAdmin } = require("../middleware/authentication")
const express = require(`express`)
const upload = require("../utils/multer")
const { FarmerlogInValidator,FarmerSingUpValidator } = require("../middleware/validator")
const router = express.Router()


router.post(`/farmer-signup`,farmerSignUp)

router.post(`/farmer-login`, FarmerlogInValidator, loginUser)

router.get(`/farmer-verify/:token`, verifyEmail)

router.post(`/farmer-resend-verification/farmer`, resendVerificationEmail)

router.put(`/farmer-update-user/:userID`, upload.single('profilePicture'), updateUser)

router.post(`/farmer-forgot-password/`, forgotPassword)

router.post(`/farmer-change-passwordfarmer/:token`, changePassword)

router.post(`/farmer-reset-password/:token`, resetPassword)

router.post(`/farmer-update-profilepicture/:token`, uploadDP)

router.post(`/log-out`, logOut)

module.exports = router 