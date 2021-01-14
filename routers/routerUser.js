const express = require('express')
const router = new express.Router()
const userControler = require('../controler/userControler')

router.post('/register', userControler.addUsers)
router.post('/signIn', userControler.logUser)

module.exports = router