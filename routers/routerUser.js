const express = require('express')
const router = new express.Router()
const userControler = require('../controler/userControler')

router.post('/register', userControler.addUsers)

module.exports = router