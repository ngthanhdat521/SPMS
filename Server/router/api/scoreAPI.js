const express = require('express');
const ScoreController = require('../../controller/ScoreController');
const router = express.Router();

router.post('/mentor/save/:lecturerId', ScoreController.saveMentorScore);
router.post('/council/save/:councilId/:lecturerId', ScoreController.saveScoreCouncil);
router.get('/group/get/:groupId', ScoreController.getScoreOfGroup);
router.get('/group/list', ScoreController.getScoreOfGroupAll);
module.exports = router;