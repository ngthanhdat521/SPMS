const {uploadFile} = require('../../helper/upload');
const express = require('express');
const router = express.Router();
const fileStorageController = require('../../controller/FileStorageController');

router.post('/upload/:userId', uploadFile("upload\\notification").fields([
    {name: 'file1', maxCount: 1},
    {name: 'file2', maxCount: 1},
    {name: 'file3', maxCount: 1},
    {name: 'file4', maxCount: 1}]), fileStorageController.addFiles);//Test
router.get('/', fileStorageController.get);
router.get('/download/:fileId', fileStorageController.downloadFileByFileId);
module.exports = router;