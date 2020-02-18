const express = require('express')
const router = express.Router()
const User = require("../models/User.model");
const axios = require('axios')
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })
const uploadCloud = require('../config/cloudinary.config')

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

router.get('/', ensureLoggedIn('/auth/login'), (req, res) => {
    User.findById(req.user._id)
        .then(user => res.render('./auth/profile', user))

})
router.post('/add-image', uploadCloud.single('photoupload'), (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { photo: req.file.secure_url }, { new: true })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(`este es el error: ${err}`))
})

module.exports = router;