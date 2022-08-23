const { EvaluateStage } = require("../db/models/EvaluateStageModel");
const { Project } = require("../db/models/ProjectModel");
const { Stage } = require("../db/models/StageModel");
const { Student } = require("../db/models/StudentModel");
const ProjectService = require("./ProjectService");
const StageService = require("./StageService");
const StudentService = require("./StudentService");

class EvaluateStageService {

    checkStudentInStage = async (stageId, stuId) =>{
        const stageData = await Stage.findOne({
            where: {stageId},
            raw: true
        }).then(data => data);
        if(stageData){
            const projectData = await Project.findOne({
                where:{
                    projectId: stageData.projectId,
                }, raw: true
            })
            return await Student.findOne({
                where:{
                    stuId,
                    groupId: projectData.groupId
                }, raw: true
            }).then(data => data?true:false);
        }
        return false;
    }
    //kiểm tra student đã được đánh giá trong stage này chưa
    checkStudentInEvaluateStage = async (stageId, stuId) =>{
        return await EvaluateStage.findOne({
            where:{
                stuId,
                stageId,
            }, raw: true
        }).then(data => data? true: false);
    }

    addEvaluates = async (evaluates) =>{
        for (const eva of evaluates) {
            console.log(await this.checkStudentInStage(eva.stageId, eva.stuId))
            if(!await this.checkStudentInStage(eva.stageId, eva.stuId) || await this.checkStudentInEvaluateStage(eva.stageId, eva.stuId)){
                return false;
            }
        }
        return await EvaluateStage.bulkCreate(evaluates)
            .then(data => data?true:false);
    }

    getEvaluateOfStageDetail = async (stageId) =>{
        return await Stage.findOne({
            where:{
                stageId,
            }, raw: true,
        }).then(async stageData =>{
            if(stageData){
                return {
                    ...stageData,
                    evaluates: await EvaluateStage.findAll({
                        where:{
                            stageId,
                        }
                    }).then(async data =>{
                        if(data && data.length > 0)
                            data = await Promise.all(data.map(async evaluate =>{
                                const studentData = await StudentService.getStudentByStuId(evaluate.stuId);
                                return{
                                    ...studentData,
                                    evaluate:{
                                        percentage: evaluate.percentage,
                                        comment: evaluate.comment
                                    }
                                }
                            }))
                        return data;
                    })
                }
                
            }
            return "NO STAGE";
        })
    }

    //cập nhật mảng evaluate;
    updateEvaluates = async(evaluates) =>{
        if(evaluates.length > 0){
            //quét qua mảng đánh giá xem có student nào không hợp lệ không
            for (const eva of evaluates) {
                console.log(await this.checkStudentInEvaluateStage(eva.stageId, eva.stuId))
                if(!await this.checkStudentInStage(eva.stageId, eva.stuId) || !await this.checkStudentInEvaluateStage(eva.stageId, eva.stuId)){
                    return false;
                }
            }
            //Nếu hợp lệ hết
            //update
            let evaluatesUpdate = [];
            for(const eva of evaluates){
                console.log(eva)
                await EvaluateStage.update(eva,{
                    where:{
                        stuId: eva.stuId,
                        stageId: eva.stageId
                    }
                }).then(async count =>{
                    console.log("count",count)
                    if(count[0] > 0){
                        const evaluateData = await EvaluateStage.findOne({
                            where:{
                                stuId: eva.stuId,
                                stageId: eva.stageId,
                            }, raw: true
                        })
                        evaluatesUpdate.push(evaluateData);
                    }
                })
                console.log(evaluatesUpdate)
            }
            return  evaluatesUpdate;
        }
        return null;
    }

    //xoá tất cả đánh giá của thành viên trong Stage này
    deleteAllEvaluatesOfStage = async (stageId) =>{
        
        return await EvaluateStage.findAll({
            where:{
                stageId
            }, raw: true
        }).then(async data =>{
            if(data){
                return await EvaluateStage.destroy({
                    where:{
                        stageId
                    }
                }).then(() => data)
            }
            return false;
        })
    }
}
module.exports = new EvaluateStageService();