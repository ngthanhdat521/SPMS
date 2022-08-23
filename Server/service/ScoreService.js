const { CouncilMember } = require("../db/models/CouncilMemberModel");
const { GroupLecturer } = require("../db/models/GroupLecturerModel");
const { Group } = require("../db/models/GroupModel");
const { Score } = require("../db/models/ScoreModel");
const { Student } = require("../db/models/StudentModel");
const RoleService = require("./RoleService");
const LecturerService = require("./LecturerService");
const GroupService = require("./GroupService");
const { Council } = require("../db/models/CouncilModel");

class ScoreService{

    //kiểm tra student có tồn tại trong group không
    checkStudentInCouncil = async (stuId, councilId) =>{
        return await Student.findOne({
            where:{
                stuId
            },
            raw: true,
        }).then(async data => {
            if(data) {
                return await Group.findOne({
                    where:{
                        groupId: data.groupId,
                        councilId
                    }
                }).then(groupData => groupData?true:false);
            }
            return false;
        });
    }

    checkMentorOfStudent = async (stuId, lecturerIds) =>{
        return await Student.findOne({
            where:{
                stuId
            },
            raw: true,
        }).then(async data => {
            if(data) {
                return await GroupLecturer.findAll({
                    where:{
                        groupId: data.groupId,
                        lecturerId: lecturerIds
                    }
                }).then(groupData => groupData&& groupData.length > 0?true:false);
            }
            return false;
        });
    }

    memberCouncilSaveScore = async (stuId, councilId, scoreObject) =>{
        return await Score.update(
            scoreObject,
            {
                where:{
                    stuId,
                    councilId
                }
            }
        ).then(async count =>{
            if(count[0] > 0)
                return await Score.findAll({
                    where:{
                        stuId,
                        councilId
                    }, raw: true
                })
            return null;
        })
    }

    checkStudentScoreRecordInScore = async(stuId, councilId) =>{
        return await Score.findAll({
            where:{
                stuId, councilId
            }, raw: true
        }).then(datas => datas&& datas.length > 0?true:false);
    }

    //lưu điểm của các thành viên trong council
    saveScoreCouncil = async (lecturerId, councilId, studentPoints) =>{
        //check student trong council và data trong bảng score
        for (const point of studentPoints) {
            if(!await this.checkStudentInCouncil(point.stuId, councilId) && !await this.checkStudentScoreRecordInScore(point.stuId, councilId))
                return "STUDENT NOT IN COUNCIL OR NO SCORE RECORD";
        }

        //check member trong council
        const councilMemberData = await CouncilMember.findOne({
            where:{
                lecturerId, 
                councilId
            }, raw: true
        });
        
        if(councilMemberData){
            //get role name cuả lecturer trong council
            const roleName = await RoleService.getLecturerRoleInCouncilDetail(councilMemberData.roleId)
                .then(data => data.roleName);
            const scoreDataArr = [];
            switch (roleName) {
                case "assistant":
                    for (const point of studentPoints) {
                        const saveData = await this.memberCouncilSaveScore(point.stuId, councilId,{assistantScore: point.score})
                        if(saveData)
                            scoreDataArr.push(...saveData);
                    }
                    break;
                case "president":
                    for (const point of studentPoints) {
                        const saveData = await this.memberCouncilSaveScore(point.stuId, councilId,{presidentScore: point.score})
                        if(saveData)
                            scoreDataArr.push(...saveData);
                    }
                    break;
                case "reviewer":
                    for (const point of studentPoints) {
                        const saveData = await this.memberCouncilSaveScore(point.stuId, councilId,{reviewerScore: point.score})
                        if(saveData)
                            scoreDataArr.push(...saveData);
                    }
                    break;
                default:
                    break;
            }
            return scoreDataArr;
        }
        return "EVALUATOR NOT IN COUNCIL"
    }

    //lưu điểm của mentor
    saveMentorScore = async (lecturerIds, studentPoints) =>{
        //check mảng student với mentor hợp lệ không 
        for (const point of studentPoints) {
            //nếu mà có một student không đúng thì trả về false;
            if(!await this.checkMentorOfStudent(point.stuId, lecturerIds))
                return false;
        }

        //tất cả student đúng hết
        //lọc qua từng student
        
        //mảng Student data mới
        const studentArr = [];
        for (const point of studentPoints) {
            //kiểm tra đã có records in score chưa
            const scoreRecords = await Score.findAll({
                where:{
                    stuId: point.stuId
                }, raw: true
            }).then(data => data? data: null);
            // console.log(scoreRecord);
            //nếu scoreRecord != null => đã có record
            if(scoreRecords){
                //cập nhật điểm 
                await Score.update({
                    mentorScore: point.score
                },{
                    where:{
                        stuId: point.stuId
                    }
                }).then(async count =>{
                    if(count[0] > 0){
                        //add new student data to studentArr
                        studentArr.push(...await Score.findAll({
                            where: {
                                stuId: point.stuId,
                            }, raw: true
                        }))
                    }
                })
            }
            // else{
            //     //tạo mới score record 
            //     await Score.create({
            //         stuId: point.stuId,
            //         lecturerId,
            //         mentorScore: point.score,
            //     },{
            //         raw: true
            //     }).then(data =>{
            //         //add new student data to studentArr
            //         if(data)
            //             studentArr.push(data);
            //     })
            // }
        }
        return studentArr;
    }

    //lấy danh sách điểm của nhóm
    getScoreOfGroup =  async (groupId) =>{
        return await Group.findOne({
            where: {
                groupId
            }, raw: true
        }).then(async groupData =>{
            if(groupData){
                //mentor data
                const mentorsDataArr = await GroupLecturer.findAll({
                    where: {
                        groupId: groupData.groupId
                    }, raw: true
                }).then(async arr =>{
                    if(arr.length > 0){
                        return await Promise.all(arr.map(async groupLecturer =>{
                            return await LecturerService.getLecturerByLectureId(groupLecturer.lecturerId);
                        }))
                    }
                    return arr;
                })
                //students data
                const studentsAndScoresDataArr = await GroupService.getMembersGroup(groupId)
                    .then(async studentArr =>{
                        if(studentArr.length > 0)
                            studentArr = await Promise.all(studentArr.map(async student =>{
                                //nếu có 1 hoặc 2 mentor thì chỉ cần lấy mentor đầu tiên. bởi vì
                                //Trên trả về mảng
                                //nếu có 2 mentor thì dữ liệu điểm của cả hai là giống nhau
                                const score = await Score.findOne({
                                    where: {
                                        stuId: student.stuId,
                                        // lecturerId: mentorsDataArr[0].lecturerId
                                    }, raw: true
                                    , attributes: [
                                        "mentorScore",
                                        "presidentScore",
                                        "assistantScore",
                                        "reviewerScore"
                                    ]
                                });
                                return {
                                    ...student, 
                                    score
                                }
                            }));
                        return studentArr;
                    });

                //council data
                const councilData = await Council.findOne({
                    where:{
                        councilId: groupData.councilId
                    }, raw: true
                })
                groupData.mentors = mentorsDataArr;
                groupData.councilData = councilData;
                groupData.students = studentsAndScoresDataArr;
                delete groupData.councilId;

                return groupData;
            }
            return null;
        })
    }

    //lấy tất cả danh sách điểm 
    getScoreOfGroupAll = async () =>{
        return await Group.findAll({
            raw: true
        }).then(async arr =>{
            return await Promise.all(arr.map(async group =>{
                return await this.getScoreOfGroup(group.groupId);
            }))
        })
    }

}

module.exports = new ScoreService();