const { signUp, loginUser, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, getOne, getAll, makeAdmin, deleteUser, logOut, updateUser, updatePicture, getOneFarmer, getAllFarmers, deleteFarmer} = require("../controllers/UserController")
const { authorize, isAdmin } = require("../middleware/authentication")
const express = require(`express`)
const upload = require("../utils/multer")
const { singUpVlidator, logInValidator } = require("../middleware/validator")
const router = express.Router()


router.post(`/user-signup`,singUpVlidator, signUp)

router.post(`/log-in`,logInValidator, loginUser)

router.get(`/verify/:token`, verifyEmail)

router.post(`/resend-verification`, resendVerificationEmail)

router.put(`/update-user/:userID`, upload.single('profilePicture'), updateUser)


router.post(`/forgot-password`, forgotPassword)

router.post(`/change-password/:token`, changePassword)

router.post(`/reset-password/:token`, resetPassword)

router.put(`/update-profilepicture/:token`,upload.single('profilePicture'), updatePicture)

router.get(`/getone/:userID`,authorize, getOne)

router.get(`/getonefarmer/:farmerID`,authorize, getOneFarmer)

router.get(`/getallfarmers/`,authorize, getAllFarmers)

router.get(`/getall/`,authorize, getAll)

router.post(`/make-admin/:userID`,authorize, isAdmin, makeAdmin)

router.delete(`/delete-user/:userID`, isAdmin, deleteUser)

 router.delete(`/delete-farmer/:userID`, isAdmin, deleteFarmer)

 router.post(`/log-out`, logOut)


 module.exports = router