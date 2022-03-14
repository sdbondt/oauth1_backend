require('dotenv').config()
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errorhandlers/customError')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new CustomError('Authentication invalid.', StatusCodes.UNAUTHORIZED)
        }
        const token = authHeader.split(' ')[1]
        const isCustomAuth = token.length < 500
        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decodedData.userId).select('-password')
            if (!user) {
                throw new CustomError('Authentication invalid.', StatusCodes.UNAUTHORIZED)
            }
            req.user = user
        } else {
            console.log('decoded')
            decodedData = jwt.decode(token)
            console.log(decodedData)
            const user = await User.findOne({ email: decodedData.email }).select('-password')
            if (user) {
                req.user = user
            } else {
                req.user = { email: decodedData.email, name: decodedData.name }
            }
        }
        next()
    } catch (e) {
        throw new CustomError('Authentication invalid.', StatusCodes.UNAUTHORIZED)
    }
}

module.exports = auth
