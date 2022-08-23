const { Project } = require("../db/models/ProjectModel");
const {Stage} = require("../db/models/StageModel");
const {Op} = require("sequelize");
const checkObject = require("../utils/checkObject");

class StageService {

    checkProject = async(projectId) =>{
        return await Project.findOne({
            where:{
                projectId,
                isApproved: "approved"
            }, raw: true,
        }).then(data => data?true:false)
    }

    addStage = async (stage) =>{
        //kieemr tra project
        return await Project.findOne({
            where:{
                projectId: stage.projectId,
                isApproved: "approved",
                leaderId:{
                    [Op.not]: null,
                },
                groupId:{
                    [Op.not]: null
                }
            },
            raw: true
        }).then(async projectData =>{
            if(projectData){
                //taoj stage khoong trung name
                const stageData = await Stage.findOrCreate({
                    where: { 
                        projectId: stage.projectId,
                        stageName : stage.stageName,
                    },
                    defaults: stage,
                    raw: true
                })
                let check = stageData.find(stageEle => {
                    return typeof stageEle === 'boolean';
                })
                return check ? stageData[0]: "NAME DUPPLICATE";
            }
            return "NO PROJECT"
        })
        
    }

    updateStage = async (projectId,stageId,stage) =>{
        const checkProject = await this.checkProject(projectId);
        if(checkProject){
            //kieemr tra có stage
            return await Stage.findOne({
                where:{
                    projectId,
                    stageId,
                },
                raw: true
            }).then(async stageData =>{
                if(stageData){
                    //kiểm tra có trùng tên stage của project này không
                    const check = await Stage.findOne({
                        where:{
                            projectId,
                            stageName: stage.stageName,
                        }, raw: true
                    }).then(data => data? true: false)
                    if(!check)
                        return await Stage.update(stage, {
                            where:{
                                projectId,
                                stageId
                            }
                        }).then(async count =>{
                            return count[0]>0?(
                                await Stage.findOne({
                                    where:{
                                        projectId,
                                        stageId,
                                    }, raw: true
                                })
                            ):false
                        })
                    return "NAME DUPLICATE";
                }
                return "NO STAGE"
            })
        }
        return "NO PROJECT";
    }

    deleteStage = async (projectId, stageId) =>{
        const checkProject = await this.checkProject(projectId);
        if(checkProject){
            return await Stage.findOne({
                where:{
                    stageId,
                    projectId
                }, raw: true
            }).then(async data =>{
                if(data)
                    return await Stage.destroy({
                        where:{
                            stageId,
                            projectId
                        }
                    }).then(count => count>0?data.stageId:false);
                return false;
            })
        }
        return "NO PROJECT";
    }

    getAllStageOfProject = async (projectId) =>{
        const checkProject = await this.checkProject(projectId);
        if(checkProject){
            return await Stage.findAll({
                where:{
                    projectId
                }, raw: true
            }).then(data => data);
        }
        return "NO PROJECT";
    }

}

module.exports = new StageService();