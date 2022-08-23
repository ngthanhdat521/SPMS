const { Notification } = require("../db/models/NotificationModel");
const fileStorageService = require("../service/FileStorageService");
const checkObject = require("../utils/checkObject");
const notificationFileService = require("../service/NotificationFileService");
const { NotificationFile } = require("../db/models/NotificationFileModel");
const { FileStorage } = require("../db/models/FileStorageModel");

class NotificationService {
    //thêm notification
    addNotification = async (notification, files) => {
        let fileStorageDataArray = [];
        //Tạo fileStorage
        if (files !== undefined || files.length > 0) {
            console.log("vao");
            fileStorageDataArray = await fileStorageService.addFiles(
                files,
                notification.userId
            );
        }
        const notificationInput = {
            ...notification,
            fileId1: fileStorageDataArray[0]
                ? fileStorageDataArray[0].fileId
                : null,
            fileId2: fileStorageDataArray[1]
                ? fileStorageDataArray[1].fileId
                : null,
            fileId3: fileStorageDataArray[2]
                ? fileStorageDataArray[2].fileId
                : null,
            fileId4: fileStorageDataArray[3]
                ? fileStorageDataArray[3].fileId
                : null,
        };
        // Tạo notification
        return await Notification.create(notificationInput, { raw: true }).then(
            async (notiData) => {
                notiData = notiData.get({ plain: true });
                if (checkObject(notiData)) {
                    return {
                        notification: notiData,
                    };
                }
                return null;
            }
        );
        //Thêm vào notificationFile
        // .then(async notiData => {
        //     //Thêm notification file
        //     if (checkObject(notiData)){
        //         if(notiData.files.length > 0)
        //             await notificationFileService.addNotificationFile(notiData.notification.notificationId, notiData.files)
        //     }
        //     return notiData;
        // });
    };

    //Thông tin một notification
    getNotificationByNotificationId = async (notificationId) => {
        const notification = await Notification.findOne({
            where: {
                notificationId,
            },
            raw: true,
        }).then(async (notificationData) => {
            if (notificationData) {
                const fileId1 = notificationData.fileId1
                    ? notificationData.fileId1
                    : null;
                const fileId2 = notificationData.fileId2
                    ? notificationData.fileId2
                    : null;
                const fileId3 = notificationData.fileId3
                    ? notificationData.fileId3
                    : null;
                const fileId4 = notificationData.fileId4
                    ? notificationData.fileId4
                    : null;

                let file1Object = null,
                    file2Object = null,
                    file3Object = null,
                    file4Object = null;
                if (fileId1)
                    file1Object = await fileStorageService.getFileByFileId(
                        fileId1
                    );
                if (fileId2)
                    file2Object = await fileStorageService.getFileByFileId(
                        fileId2
                    );
                if (fileId3)
                    file3Object = await fileStorageService.getFileByFileId(
                        fileId3
                    );
                if (fileId4)
                    file4Object = await fileStorageService.getFileByFileId(
                        fileId4
                    );
                // console.log(file1Object, file2Object, file3Object, file4Object);

                delete notificationData.fileId1;
                delete notificationData.fileId2;
                delete notificationData.fileId3;
                delete notificationData.fileId4;
                return {
                    ...notificationData,
                    file1: file1Object,
                    file2: file2Object,
                    file3: file3Object,
                    file4: file4Object,
                };
                //notificationData => mảng notification File
                //Xử lý trả về mảng file
                // const files = await NotificationFile.findAll({
                //     where: {
                //         notificationId
                //     },
                //     raw: true
                // }).then(async dataList =>{
                //     let fileList = [];
                //     if(dataList && dataList.length > 0){
                //         //Map mảng notificationFile thành mảng Files
                //         fileList = await Promise.all(dataList.map(async data =>{
                //             return await FileStorage.findOne({
                //                 where: {fileId: data.fileId},
                //                 raw: true

                //             })
                //         }))
                //     }
                //     return fileList;
                // })
                // return {
                //     ...notificationData,
                //     files
                // }
            }
            return null;
        });
        return notification;
    };

    //Danh sách notification
    getAllNotification = async () => {
        return await Notification.findAll({
            raw: true,
        }).then(async (dataList) => {
            return await Promise.all(
                dataList.map(async (data) => {
                    return await this.getNotificationByNotificationId(
                        data.notificationId
                    );
                })
            );
        });
    };

    //newNotification{
    //    title,
    //    content,
    //    oldFiles:{
    //        file1: {} / null,
    //        file2: {} / null,
    //        file3: {} / null,
    //        file4: {} / null,
    //    },
    //    file1: {}/null
    //    file2: {}/null
    //    file3: {}/null
    //    file4: {}/null
    //  }
    updateNotificationByNotificationId = async (
        notificationId,
        newNotification
    ) => {
        let { oldFiles, newFiles } = {...newNotification};

        //tìm kiếm noticication
        newFiles = newFiles.filter((file) => file !== null);
        // console.log(newFiles);
        return await Notification.findOne({
            where: {
                notificationId,
            },
        }).then(async (notificationData) => {
            //Nếu có notification
            if (notificationData && checkObject(notificationData)) {
                //tạo ra một object notification để update
                const notificationUpdate = notificationData.get({
                    plain: true,
                });
                delete notificationUpdate.notificationId;
                delete notificationUpdate.createdAt;
                delete notificationUpdate.updatedAt;
                delete notificationUpdate.userId;
                notificationUpdate.title = newNotification.title;
                notificationUpdate.content = newNotification.content;
                
                // console.log("notificationUpdate trước: ", notificationUpdate);
                //mảng notification id sẽ đưuọc xóa đi khỏi FileStorage
                const fileIdNeedDelete = [];
                //lặp qua từng file cũ
                console.log(oldFiles);
                oldFiles = JSON.parse(oldFiles);
                
                for (const i in oldFiles) {
                    const value = oldFiles[i];
                    //nếu fileId1 của notification Dcó,
                    //Nếu  fileId1 của notification = fileId ủa file1 cũ
                    if (
                        notificationData.fileId1 &&
                        notificationData.fileId1 === value.fileId
                    ) {
                        //thì fileId1 cần update phải bằng null
                        notificationUpdate.fileId1 = null;
                        //thêm fileId cần xóa khỏi FileStorage vào fileIdNeedDelete
                        fileIdNeedDelete.push(value.fileId);
                    } else if (
                        notificationData.fileId2 &&
                        notificationData.fileId2 === value.fileId
                    ) {
                        notificationUpdate.fileId2 = null;
                        fileIdNeedDelete.push(value.fileId);
                    } else if (
                        notificationData.fileId3 &&
                        notificationData.fileId3 === value.fileId
                    ) {
                        notificationUpdate.fileId3 = null;
                        fileIdNeedDelete.push(value.fileId);
                    } else if (
                        notificationData.fileId4 &&
                        notificationData.fileId4 === value.fileId
                    ) {
                        notificationUpdate.fileId4 = null;
                        fileIdNeedDelete.push(value.fileId);
                    }
                }
                // console.log("notificationUpdate trước 2: ", notificationUpdate);
                // console.log("fileIdNeedDelete mảng file cần xóa: ", fileIdNeedDelete);
                //tạo file đã mới đã đăng lên
                console.log("start");
                console.log(newFiles);
                const filesDataArr = await fileStorageService.addFiles(
                    newFiles
                );

                if (filesDataArr.length > 0) {
                    filesDataArr.forEach((file) => {
                        if (!notificationUpdate.fileId1)
                            notificationUpdate.fileId1 = file.fileId;
                        else if (!notificationUpdate.fileId2)
                            notificationUpdate.fileId2 = file.fileId;
                        else if (!notificationUpdate.fileId3)
                            notificationUpdate.fileId3 = file.fileId;
                        else if (!notificationUpdate.fileId4)
                            notificationUpdate.fileId4 = file.fileId;
                    });
                }

                //cập nhật notification
                // console.log("notificationUpdate sau khi update", notificationUpdate);
                const rowUpdate = await Notification.update(
                    notificationUpdate,
                    {
                        where: {
                            notificationId,
                        },
                    }
                );
                const countRowUpdate = rowUpdate[0];
                //nếu mảng file id cần xóa có thì xóa file

                if (fileIdNeedDelete.length > 0) {
                    //Xóa data trong fileStorage bằng những id trong fileIdNeedDelete
                    await fileStorageService.deleteFilesByFileIds(
                        fileIdNeedDelete
                    );
                }
                if (countRowUpdate > 0) return true;
            }
            return false;
        });
    };

    //xóa thông báo bằng notificationId
    deleteNotificationByNotificationID = async (notificationId) => {
        return await Notification.findOne({
            where: {
                notificationId,
            },
            raw: true,
        }).then(async (data) => {
            if (data) {
                // console.log(data);
                const fileIds = [
                    data.fileId1,
                    data.fileId2,
                    data.fileId3,
                    data.fileId4,
                ].filter((file) => file && file);
                if (fileIds.length > 0) {
                    const countRowFileStorageDelete =
                        await fileStorageService.deleteFilesByFileIds(fileIds);
                    if (countRowFileStorageDelete > 0) return true;
                } else {
                    const countRowNotificatitonDelete =
                        await Notification.destroy({
                            where: { notificationId },
                        });
                    if (countRowNotificatitonDelete > 0) return true;
                }
            }
            return false;
        });
    };
}

module.exports = new NotificationService();
