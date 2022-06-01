const router = require('express').Router()
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser)

module.exports = router