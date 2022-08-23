const lecturerService = require('../service/LecturerService');
const generalPassword = require('../helper/GeneralPassword');
//api: /api/user_role/
class LecturerController {

    //Thêm lecture
    //POST: /add
    addLecturer = async (req, res, next) => {
        //{email}
        const email = req.body.email.trim();
        const password = generalPassword();
        // console.log(password);
        await lecturerService.addLecturer({
                email,
                password
            })
            .then(data => {
                if (data) {
                    if (data !== "USERID DUPPLICATE")
                        return res.status(200).json(data);
                    return res.status(400).send("Lỗi. Đã có tài khoản cho người dùng này.");
                }
                return res.status(400).send("Lỗi thêm user");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //Cập nhật lecture
    //Post: /update/:userId
    updateLecturerAndUser = async (req, res, next) => {
        const userId = req.params.userId;
        const dataUpdate = req.body;
        await lecturerService.updateLecturerAndUser(userId, dataUpdate)
            .then(data => {
                if (data !== "USER NOT FOUND")
                    return res.status(200).send("Cập nhật thành công");
                return res.status(404).send("Không tìm thấy người dùng");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //Danh sách lecture 
    //GET: /list
    getAllLecturer = async (req, res, next) => {
        await lecturerService.getAllLecturer()
            .then(data => {
                if (data)
                    return res.status(200).json(data);
                return res.status(404).send("Không có data");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //GET: /get/:userId
    getLecturerByUserId = async (req, res, next) => {
        await lecturerService.getLecturerByUserId(req.params.userId)
            .then(data => {
                if (data)
                    return res.status(200).json(data);
                return res.status(404).send("Không tìm thấy data.");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //GET: /exportFile
    exportFile = async (req, res) => {

        try {
            lecturerService.exportFile();
            res.send({
                status: "200",
                message: "file successfully downloaded",
            });
        } catch (err) {
            res.send({
                status: "400",
                message: "Something went wrong",
            });
        }
    }

    addTopicTemplate = async (req, res, next) =>{
        const topicTemplate = {
            projectName: req.body.projectName,
            projectDesc: req.body.projectDesc,
            lecturerId: req.body.lecturerId,
            note: req.body.note,
            files: req.files,
        }
        await lecturerService.addTopicTemplate(topicTemplate)
            .then(data => {
                if (data)
                    return res.status(200).json("Thêm topic template thành công");
                return res.status(404).send("Lỗi thêm topic");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    updateTopicTemplate = async (req, res, next) =>{
        const lecturerId = req.params.lecturerId;
        const projectId = req.params.projectId;
        const topicTemplate = {
            ...req.body,
            lecturerId,
            projectId,
            newFiles: req.files ? req.files: []
        }
        await lecturerService.updateTopicTemplate(topicTemplate)
            .then(data =>{
                if(data === "NO PROJECT")
                    return res.status(400).send("Không tìm thấy topic template của người này.")
                else if(data === "NO USER-DATA")
                    return res.status(400).send("Không tìm thấy user data.")
                else
                    return res.status(200).send("Cập nhật thành công");
            })
            .catch(err =>{
                return res.status(400).json(err);
            })
    }

}

module.exports = new LecturerController();