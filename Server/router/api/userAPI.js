const express = require('express');
const router = express.Router();
const userController = require('../../controller/UserController');

router.post('/add', userController.addUser);//(Test)
router.post('/update/:userId', userController.updateUser);//(Test)
router.post('/delete/:userId', userController.removeUserById);
router.post('/signin', userController.signin);
router.get('/', userController.getAllUser);

module.exports = router;