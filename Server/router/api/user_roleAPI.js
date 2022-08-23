const express = require('express');
const router = express.Router();
const userRoleController = require('../../controller/UserRoleController');

router.post('/add', userRoleController.addUserRole);//(Test)

module.exports = router;