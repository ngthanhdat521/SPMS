const StageService = require("../service/StageService");

class StageController {

    addStage = async (req, res, next)=>{
        const stage = {
            stageName: req.body.stageName?req.body.stageName:null,
            stageDesc: req.body.stageDesc?req.body.stageDesc: null,
            startDate: req.body.startDate?req.body.startDate: null,
            endDate: req.body.endDate?req.body.endDate: null,
            projectId: req.params.projectId,
        }
        await StageService.addStage(stage)
            .then(data =>{
                if(data === "NAME DUPPLICATE")
                    return res.status(400).send("Trùng tên stage đã có. Tạo không thành công");
                else if(data === "NO PROJECT")
                    return res.status(400).send("Không tìm thấy proeject hoặc chưa được chấp thuận từ hệ thống hoặc project này là topic template.");
                else
                    return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send(err.message);
            });
    }
    updateStage = async (req, res, next)=>{
        const stage = {
            stageName: req.body.stageName?req.body.stageName:null,
            stageDesc: req.body.stageDesc?req.body.stageDesc: null,
            startDate: req.body.startDate?req.body.startDate: null,
            endDate: req.body.endDate?req.body.endDate: null,
        }
        await StageService.updateStage(req.params.projectId, req.params.stageId, stage)
            .then(data =>{
                if(data === "NO PROJECT")
                    return res.status(400).send("Không tìm thấy project hoặc chưa được approved");
                else if(!data)
                    return res.status(400).send("Cập nhật không thành công");
                else if(data === "NO STAGE")
                    return res.status(400).send("Không tìm thấy stage");
                else if(data === "NAME DUPLICATE")
                    return res.status(400).send("Lỗi trùng tên với stage khác");
                else
                    return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send(err.message);
            });
    }

    deleteStage = async(req, res, next) =>{
        await StageService.deleteStage(req.params.projectId, req.params.stageId)
            .then(data =>{
                if(data === "NO PROJECT")
                    return res.status(400).send("Không tìm thấy project hoặc chưa được approved");
                else if(!data)
                    return res.status(400).send("Không tìm thấy stage");
                else
                    return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send(err.message);
            });
    }

    getAllStageOfProject = async(req, res, next) =>{
        await StageService.getAllStageOfProject(req.params.projectId)
            .then(data =>{
                if(data === "NO PROJECT")
                    return res.status(400).send("Không tìm thấy project hoặc chưa được approved");
                return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send(err.message);
            });
    }
}

module.exports = new StageController();