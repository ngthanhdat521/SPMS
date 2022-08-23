const express = require('express');
const projectController = require('../../controller/ProjectController');
const router = express.Router();

router.post("/update/topic/:projectId", projectController.updateProjectNoStart);
router.post("/update/project/:projectId", projectController.updateProjectStart);
router.get("/get/:typeCapstone", projectController.getProjectByTypeCapstone);
router.post("/reject/:projectId", projectController.rejectTopic);
router.post("/approved/:projectId", projectController.approvedTopic);
router.post("/cancel/:projectId", projectController.cancelTopic);
router.post("/delete/:projectId", projectController.deleteTopic);
router.get("/exportFile", projectController.exportProjectListExcelFile );
router.get("/topicTemplate/detail/:projectId", projectController.getTopicTemplateDetail  );
router.get("/topicTemplate/get", projectController.getAllTopicTemplate);
router.post("/topicTemplate/delete/:lecturerId/:projectId", projectController.deleteTopicTemplate);
router.get("/detail/:projectId", projectController.getProjectDetailByProjectId);
module.exports = router;