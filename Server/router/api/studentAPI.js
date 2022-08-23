const express = require('express');
const router = express.Router();
const StudentController = require('../../controller/StudentController');
router.post('/registerExecuteProject', StudentController.registerExecuteProject);
router.get('/:id', StudentController.getStudent);
router.get('/',StudentController.getAllStudent);
router.post('/update/:id', StudentController.approveStudent);
router.post('/registerTopic/:stuId', StudentController.createTopic);
module.exports = router;