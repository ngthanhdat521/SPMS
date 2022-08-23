const notificationService = require('../service/NotificationService');

//API: /api/notification
class NotificationController {

    //Theem notificatioin
    //POST: /add/:userId
    addNotification = async (req, res, next) => {
        const notification = {
            ...req.body,
            userId: req.params.userId
        }
        const file1 = req.files.file1 ? req.files.file1[0] : null;
        const file2 = req.files.file2 ? req.files.file2[0] : null;
        const file3 = req.files.file3 ? req.files.file3[0] : null;
        const file4 = req.files.file4 ? req.files.file4[0] : null;
        const files = [file1, file2, file3, file4];
        await notificationService.addNotification(notification, files)
            .then(data => {
                if (data)
                    return res.status(200).send("Thêm thông báo thành công");
                return res.status(400).send("Thêm thông báo không thành công!")
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //Chi tiết notificaion
    //GET: /get/:notificationId
    getNotificationByNotificationId = async (req, res, next) => {
        await notificationService.getNotificationByNotificationId(req.params.notificationId)
            .then(data => {
                if (data)
                    return res.status(200).json(data);
                return res.status(404).send("Không tìm thấy notification");
            })
            .catch(err => {
                return res.status(400).send(err);
            })
    }

    //Danh sach notification
    //GET: /list
    getAllNotification = async (req, res, next) => {
        await notificationService.getAllNotification()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }

    //Xóa thông báo bằng notificationId
    //POST: /delete/:notificationId
    deleteNotificationByNotificationID = async (req, res, next) => {
        await notificationService.deleteNotificationByNotificationID(req.params.notificationId)
            .then(data => {
                if(data)
                    return res.status(200).send("Xóa thông báo thành công");
                return res.status(400).send("Không tìm thấy thông báo");
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }

    //Cập nhật thông báo bằng notificationId
    //POST: /update/:notificationId
    updateNotificationByNotificationId = async (req, res, next) => {
        const file1 = req.files.file1 ? req.files.file1[0] : null;
        const file2 = req.files.file2 ? req.files.file2[0] : null;
        const file3 = req.files.file3 ? req.files.file3[0] : null;
        const file4 = req.files.file4 ? req.files.file4[0] : null;
        const newFiles = [file1, file2, file3, file4];
        req.body.newFiles = newFiles;
        await notificationService.updateNotificationByNotificationId(req.params.notificationId, req.body)
            .then(data =>{
                if(data)
                    return res.status(200).send("Cập nhật thông báo thành công");
                return res.status(400).send("Không tìm thấy thông báo");
            })
            .catch(err =>{
                return res.status(400).json(err)
            })
    }
}

module.exports = new NotificationController();