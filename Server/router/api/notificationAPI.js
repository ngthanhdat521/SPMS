const {uploadFile} = require('../../helper/upload');
const express = require('express');
const router = express.Router();
const notificationController = require('../../controller/NotificationController');

router.post('/add/:userId', uploadFile("upload\\notification").fields([
    {name: 'file1', maxCount: 1},
    {name: 'file2', maxCount: 1},
    {name: 'file3', maxCount: 1},
    {name: 'file4', maxCount: 1}
]), notificationController.addNotification);
router.get('/get/:notificationId', notificationController.getNotificationByNotificationId);
router.get('/list', notificationController.getAllNotification);
router.post('/delete/:notificationId', notificationController.deleteNotificationByNotificationID);
router.post('/update/:notificationId',uploadFile("upload\\notification").fields([
    {name: 'file1', maxCount: 1},
    {name: 'file2', maxCount: 1},
    {name: 'file3', maxCount: 1},
    {name: 'file4', maxCount: 1}]), notificationController.updateNotificationByNotificationId);
// router.post('/test',async (req, res, next)=>{console.log(req.body); next()}, uploadFile("upload/test").fields([
//     {name:'file1', maxCount:1}]), async (req,res) =>{return res.json(req.JSON())});
module.exports = router;