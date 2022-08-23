const ScoreService = require("../service/ScoreService");

class ScoreController{
    saveMentorScore = async (req, res, next) =>{
        await ScoreService.saveMentorScore(req.params.lecturerId, req.body)
            .then(data =>{
                if(data)
                    return res.status(200).send(data);
                //lỗi mentor không quản lý một trong những sinh viên
                return res.status(400).send("Có sinh viên không hợp lệ với mentor");
            }).catch(err => res.status(500).send(err.message))
    }

    saveScoreCouncil = async (req, res, next) =>{
        await ScoreService.saveScoreCouncil(req.params.lecturerId, req.params.councilId, req.body)
            .then(data =>{
                if(data ==="STUDENT NOT IN COUNCIL OR NO SCORE RECORD")
                    return res.status(400).send("Có sinh viên không hợp lệ trong council");
                else if(data === "EVALUATOR NOT IN COUNCIL")
                    return res.status(400).send("Người đánh giá không hợp lệ trong council");
                return res.status(200).send(data);
            }).catch(err => res.status(500).send(err.message))
    }

    getScoreOfGroup = async (req, res, next) =>{
        await ScoreService.getScoreOfGroup(req.params.groupId)
            .then(data =>{
                if(data)
                    return res.status(200).send(data);
                return res.status(400).send("Không tìm thấy group");
            }).catch(err => res.status(500).send(err.message))
    }

    getScoreOfGroupAll = async (req, res, next) =>{
        await ScoreService.getScoreOfGroupAll()
            .then(data =>{
                return res.status(200).send(data);
            }).catch(err => res.status(500).send(err.message))
    }
}

module.exports= new ScoreController();