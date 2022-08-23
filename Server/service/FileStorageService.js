const { FileStorage } = require('../db/models/FileStorageModel');
const { deleteFile } = require('../helper/handleFile');

class FileStorageService {

    //Thêm file vào database
    addFiles = async (files, userId) => {
        const fileMap = files.map(file => {
            return file && {
                fileName: file.filename,
                type: file.mimetype,
                path: file.path,
                userId: userId
            }
        })
        const fileFilter = fileMap.filter(file => {
            return file && file;
        })
        // console.log(fileFilter);
        return await FileStorage.bulkCreate(fileFilter);
    }

    //Lấy thông tin một file bằng fileId
    getFileByFileId = async (fileId) => {
        return await FileStorage.findOne({ where: { fileId }, raw: true })
    }

    //Xóa file và fileStorage  
    deleteFilesByFileIds = async (fileIds) => {
        return await FileStorage.findAll({
            where: { fileId: [...fileIds] },
            raw: true
        }).then(async datas => {
            let countRowDelete = 0;
            if (datas) {
                //xóa record
                countRowDelete = await FileStorage.destroy({
                    where: {
                        fileId: [...fileIds]
                    }
                }).then(count => {
                    if (count > 0) {
                        //xóa file 
                        datas.forEach(data => {
                            deleteFile(data.path)
                        })
                    }
                    return count;
                })
            }
            return countRowDelete;
        }).catch(err => {console.log(err); return err});

    }

    downloadFileByFileId = async(fileId) =>{
        return await FileStorage.findOne({where:{fileId}, raw: true})
            .then(data => {
                if(data)
                    return data.path;
                return null;
            })
    }
}

module.exports = new FileStorageService();