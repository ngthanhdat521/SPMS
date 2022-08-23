const express = require('express');
const router = express.Router();

const GroupController = require("../../controller/GroupController");
router.post("/createGroup", GroupController.createGroup);
router.post("/assignmentor", GroupController.assignMentor);
router.get("/", GroupController.getAllGroup);
router.get("/student/:studId", GroupController.getGroupByStudId);
router.get("/lecturer/:lecturerId", GroupController.getGroupByLecturerId);
router.delete("/:groupId", GroupController.deleteGroup);
router.put("/update/:groupId", GroupController.updateGroup);
module.exports = router;