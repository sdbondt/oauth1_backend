const express = require('express')
const { getDashBoard, getProfile } = require('../controllers/userController')
const router = express.Router()

router.get('/dashboard', getDashBoard)
router.get('/profile', getProfile)

module.exports = router