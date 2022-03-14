const asyncHandler = require("../errorhandlers/asyncHandler");

exports.getDashBoard = asyncHandler(async (req, res) => {
    res.send('dashboard')
})

exports.getProfile = asyncHandler(async (req, res) => {
    res.json({
        data: req.user.name
    })
})