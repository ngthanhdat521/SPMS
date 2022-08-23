const express = require('express');
const router = express.Router();
const departmentController = require('../../controller/DepartmentController');

router.post('/add', departmentController.addDepartment);
router.get('/:depId', departmentController.getDepartmentByDepId);

module.exports = router;
