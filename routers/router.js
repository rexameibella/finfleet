const express = require('express')
const router = express.Router()

//User
require('../controllers/admin/createUser.js')(router)
require('../controllers/admin/userLogin.js')(router)
require('../controllers/admin/eventCreate.js')(router)

//require('../controllers/categoryCreate')(router)

module.exports = router