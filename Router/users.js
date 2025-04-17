const express = require('express')
const Users = require('../Controll/users')

const router = express.Router();

router
.get('/users',Users.getAllusers)
.post('/users',Users.createuser)


  module.exports = router;
