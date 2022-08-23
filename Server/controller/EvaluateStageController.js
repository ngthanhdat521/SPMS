const EvaluateStageService = require("../service/EvaluateStageService");

class EvaluateStageController {

    addEvaluates = async (req, res, next) =>{
        await EvaluateStageService.addEvaluates(req.body)
            .then(data =>{
                if(data) 
                    return res.status(200).send("Đánh giá thành công");
                return res.status(400).send(`Lỗi thêm evaludate:
                    - Có một hoặc nhiều stage không thuộc project của student.
                    - Có môt hoặc nhiều student đã được đánh giá trong stage này.`);
            })
            .catch(err => res.status(500).send(err.message));
    }
    getEvaluateOfStageDetail = async (req, res, next) =>{
        await EvaluateStageService.getEvaluateOfStageDetail(req.params.stageId)
            .then(data =>{
                if(data === "NO STAGE")
                    return res.status(400).send(`Không tìm thấy stage`);
                else if(!data) 
                    return res.status(400).send(`Stage chưa được đánh giá`);
                else 
                    return res.status(200).json(data);
            })
            .catch(err => res.status(500).send(err.message));
    }

    updateEvaluates = async(req, res, next) =>{
        await EvaluateStageService.updateEvaluates(req.body)
            .then(data =>{
                if(data === null){
                    return res.status(400).send(`Evaluates rỗng`);
                }
                else if(!data) 
                    return res.status(400).send(`Lỗi thêm evaludate:
                    - Có một hoặc nhiều stage không thuộc project của student.
                    - Có môt hoặc nhiều student không được tìm thấy đánh giá trong stage này.`);
                else 
                    return res.status(200).json(data);
            })
            .catch(err => res.status(500).send(err.message));
    }

    deleteAllEvaluatesOfStage = async(req, res, next) =>{
        await EvaluateStageService.deleteAllEvaluatesOfStage(req.params.stageId)
            .then(data =>{
                if(!data) 
                    return res.status(400).send(`Không tìm thấy đánh giá của stage này`);
                else 
                    return res.status(200).json(data);
            })
            .catch(err => res.status(500).send(err.message));
    }
}

module.exports = new EvaluateStageController();