const ProjectService = require("../service/ProjectService");

class ProjectController {

    updateProjectNoStart = async (req, res, next) =>{
        await ProjectService.updateProjectNoStart(req.params.projectId, req.body)
            .then(data =>{
                if(data)
                    return res.status(200).send("Cập nhật topic thành công");
                return res.status(400).send("Không tìm thấy topic")
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    updateProjectStart = async (req, res, next) =>{
        await ProjectService.updateProjectStart(req.params.projectId, req.body)
            .then(data =>{
                if(data){
                    if(data === "NOT ALLOWED")
                        return res.status(400).send("Bạn đang cố tình thay đổi projectName hoặc projectDesc. Cập nhật project không thành công");
                    else if(data === "NO APPROVED")
                        return res.status(400).send("Topic chưa được cho phép.");
                    return res.status(200).send("Cập nhật project thành công");
                }
                return res.status(400).send("Không tìm thấy project")
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    getProjectByTypeCapstone = async(req, res, next) =>{
        await ProjectService.getAllProjectByTypeCapstone(req.params.typeCapstone)
            .then(data =>{
                return res.status(200).send(data);
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    rejectTopic = async (req, res, next) =>{
        await ProjectService.rejectTopic(req.params.projectId)
            .then(data =>{
                if(data)    
                    return res.status(200).send("Reject topic thành công");
                return res.status(400).send("Không tìm thấy topic");
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    approvedTopic = async (req, res, next) =>{
        await ProjectService.approvedTopic(req.params.projectId)
            .then(data =>{
                if(data)    
                    return res.status(200).send("Approved topic thành công");
                return res.status(400).send("Không tìm thấy topic");
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    cancelTopic = async (req, res, next) =>{
        await ProjectService.cancelTopic(req.params.projectId)
            .then(data =>{
                if(data)    
                    return res.status(200).send("Cancel topic về pending thành công");
                return res.status(400).send("Không tìm thấy topic");
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    deleteTopic = async (req, res, next) =>{
        await ProjectService.deleteTopic(req.params.projectId)
            .then(data =>{
                if(data)    
                    return res.status(200).send("Xoá topic thành công");
                return res.status(400).send("Không tìm thấy topic");
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }

    exportProjectListExcelFile = async (req, res, next) =>{
        await ProjectService.exportProjectListExcelFile()
        .then(data =>{
            return res.status(200).send(data)
        })
        .catch(err => {
            return res.status(500).send(err.message);
        });
    }

    getTopicTemplateDetail = async (req, res, next) =>{
        await ProjectService.getTopicTemplateDetail(req.params.projectId)
            .then(data =>{
                if(data)
                    return res.status(200).send(data);
                return res.status(400).send("Không tìm thấy topic template");
            })
            .catch(err =>{
                return res.status(500).send(err.message);
            })
    }

    getAllTopicTemplate = async (req, res, next) =>{
        await ProjectService.getAllTopicTemplate()
            .then(data =>{
                return res.status(200).send(data);
            })
            .catch(err =>{
                return res.status(500).send(err.message);
            })
    }

    deleteTopicTemplate = async (req, res, next) =>{
        await ProjectService.deleteTopicTemplate(req.params.lecturerId, req.params.projectId)
            .then(data =>{
                if(data)
                    return res.status(200).send("Xoá topic template thành công");
                return res.status(400).send("Không tìm thấy topic template của người dùng này");
        })
            .catch(err =>{
                return res.status(500).send(err.message);
            })
    }

    getProjectDetailByProjectId = async (req, res, next) =>{
        await ProjectService.getProjectDetailByProjectId(req.params.projectId)
            .then(data =>{
                if(data)
                    return res.status(200).send(data);
                return res.status(400).send("Không tìm thấy project");
        })
            .catch(err =>{
                return res.status(500).send(err.message);
            })
    }
}

module.exports = new ProjectController();