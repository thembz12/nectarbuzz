const express = require(`express`)
const passport = require ("passport")
const upload = require("../utils/multer")
const { signUp, loginUser, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, getOne, getAll, makeAdmin, deleteUser, logOut, createInfoWithReturnInfo } = require("../controller/userController")
const { authorize, isAdmin } = require("../middleware/authentication")
const router = express.Router()


router.post(`/user-signup`, upload.single('profilePicture'), signUp)

router.post(`/log-in`, loginUser)

router.get(`/verify/:token`, verifyEmail)

router.post(`/resend-verification`, resendVerificationEmail)

router.post(`/forgot-password`, forgotPassword)

router.post(`/change-password/:token`, changePassword)

router.post(`/reset-password/:token`, resetPassword)

router.get(`/getone/:studentID`, authorize, getOne)

router.get(`/getall`, authorize, getAll)

router.get(`/make-admin/:userId`, isAdmin, makeAdmin)

router.delete(`/delete-user/:userId`, isAdmin, deleteUser)

router.post(`/log-out`, logOut)

router.get("/google/callback",passport.authenticate('google',{
    successRedirect:"/api/v1/success/signup",
    failedRedirect:"/homepage",
}),)

router.get('/signupwithgoogle',
    passport.authenticate('google', { scope: ['email','profile'] }));

router.get("/success/signup",createInfoWithReturnInfo)

module.exports = router