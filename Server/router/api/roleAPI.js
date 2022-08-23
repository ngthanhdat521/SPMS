const express = require('express');
const router = express.Router();
const roleController = require('../../controller/RoleController');

router.post('/add', roleController.addRole);
router.get('/:roleName/get', roleController.getRoleByRoleName);
router.get("/council/list", roleController.getAllRoleCouncil);
module.exports = router;