
const { loginUser, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, getOne, logOut, farmerSignUp, updateUser, uploadDP} = require("../controllers/FarmerController")
const { authorize, isAdmin } = require("../middleware/authentication")
const express = require(`express`)
const upload = require("../utils/multer")
const { FarmerlogInValidator,FarmerSingUpValidator } = require("../middleware/validator")
const router = express.Router()


router.post(`/farmer-signup`,FarmerSingUpValidator,farmerSignUp)

router.post(`/farmer-login`,FarmerlogInValidator, loginUser)

router.get(`/verify/farmer/:token`, verifyEmail)

router.post(`/resend-verification/farmer`, resendVerificationEmail)

router.put(`/update-user/farmer/:userID`, upload.single('profilePicture'), updateUser)

router.post(`/forgot-password/farmer`, forgotPassword)

router.post(`/change-passwordfarmer/farmer/:token`, changePassword)

router.post(`/reset-password/farmer/:token`, resetPassword)

router.post(`/update-profilepicture/farmer/:token`, uploadDP)

router.post(`/log-out`, logOut)

module.exports = router 