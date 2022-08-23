const database = require("../db/postgresql/PostgreSQL");
const StudentService = require("./StudentService");
const LecturerService = require("./LecturerService");
const {Group} = require("../db/models/GroupModel");
const { Student } = require("../db/models/StudentModel");
const UserService = require("./UserService");

class GroupService {

    createGroup = async(data) =>{
            const isGrouped = await database.Group.findOne({
                where: {groupName: data.groupName}
            });
            if(!isGrouped){
                const group = await database.Group.create({
                    groupName: data.groupName,
                    groupDesc: data.groupDesc,
                    typeCapstone: data.typeCapstone,
                    isScientificGroup: data.isScientificGroup
                });
                await data.students.map(async studentId => {
                    await database.Student.update(
                        {
                            groupId: group.groupId
                        },{
                        where: {
                            stuId: studentId,
                            isApproved: true,
                            groupId: null
                        }
                    });
                });
                return group;
            }
            return null;
    }

    assignMentor = async (data)=>{
        const isMentored = await database.Lecturer.findOne({
            where: {lecturerId: data.lecturerId},
            raw: true
        });
        if(isMentored){
            var datas = await data.groups.map(async groupId => {
                let isGrouped =  await database.Group.findOne(
                    {
                    where: {
                        groupId: groupId,
                    }, raw: true
                });
                if(isGrouped){
                    const groupLecturer = await database.GroupLecturer.create({
                        groupId: groupId,
                        lecturerId: data.lecturerId,
                    }); 
                    
                    //phuoc update 
                    //Lấy tất cả stuId của group
                    const stuIdArr = await database.Student.findAll({
                        where:{
                            groupId
                        }, raw: true
                    }).then(dataArr =>{
                        return dataArr.map(student => student.stuId);
                    })
                    //lọc qua từng stuId
                    for (const stuId of stuIdArr) {
                        //update lectureId trong bảng điểm của từng stuId
                        //có 2 trường hợp ở đây:
                        //nếu chỉ có 1 mentor => chỉ cần update lectuerId của student đó
                        //điều kiện record có 1 mentor : stuId, lectuerId: null
                        await database.Score.findOne({
                            where:{
                                stuId, 
                                lecturerId: null
                            }, raw: true
                        }).then(async scoreData =>{
                            //nếu có data => đã có record nhưng lectureId null
                            if(scoreData){
                                await database.Score.update({
                                    lecturerId: data.lecturerId
                                }, {
                                    where:{
                                        stuId,
                                        lecturerId: null
                                    }
                                })
                            }
                            //hai mentor
                            //nếu không có data => data chưa được tạo hoặc đã có lecture được gán trước đó
                            else{
                                await database.Score.findOne({
                                    where:{
                                        stuId,
                                        lecturerId: data.lecturerId
                                    }, raw: true
                                }).then(async scoreData =>{
                                    if(!scoreData){
                                        await database.Score.create({
                                            stuId,
                                            lecturerId: data.lecturerId
                                        })
                                    }
                                })
                            }
                        })
                    }
                   //đến đây
                    return groupLecturer;
                }
            });
            return datas;
        }
        return null;
    }

    getAllGroup = async()=> {
        return await database.Group.findAll().then(async groups => {
            var Groups = Promise.all(groups.map(async group => {
                var students = [];
                var mentors = [];
                const student = await database.Student.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    order:[
                        ["gpa", "DESC"]
                    ]
                });
                if (student) {

                    for (let i = 0; i < student.length; i++) {
                        students.push(await StudentService.getStudent(student[i].userId));
                    }
                }else return null
    
                const mentor = await database.GroupLecturer.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    raw:true
                });
                if (mentor) {
                    for (let i = 0; i < mentor.length; i++) {
                        const user = await database.Lecturer.findOne({
                            where: {
                                lecturerId: mentor[i].lecturerId
                            },
                        });
                        mentors.push(await LecturerService.getLecturerByUserId(user.userId));
                    }
                }else return null
                const groupInfo = {
                    groupId: group.groupId,
                    students: students,
                    mentors: mentors,
                    name: group.groupName,
                    note: group.groupDesc,
                    councilId: group.councilId,
                    typeCapstone: group.typeCapstone,
                    isScientificGroup: group.isScientificGroup
                }
                if(groupInfo.students.length !== 0 ||groupInfo.mentors.length !== 0){
                    return await groupInfo
                }
                return null;
            }));
            return  (await Groups).filter(function (el) {
                return el != null;
              });
        });
    }
    getMembersGroup = async (groupId) =>{
        return await Student.findAll({
            where:{
                groupId
            },
            raw: true,
            order: [
                ["gpa","DESC"]
            ]
        }).then(async data =>{
            if(data){
                data = await Promise.all(data.map(async student =>{
                    const userData = await UserService.getUserByUserId(student.userId)
                    return {
                        stuId: student.stuId ,
                        userId: student.userId,
                        stuCode: student.stuCode,
                        note: student.note,
                        // councilId: group.councilId,
                        groupId: student.groupId,
                        class: student.class,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        dateOfBirth: userData.dateOfBirth,
                        email: userData.email,
                        phone: userData.phone,
                        majorId: userData.majorId
                    }
                }))
            }
            return data;
        })
    }

    getGroupByStudId = async (studId)=>{
        const student = await database.Student.findOne({
            where: {stuId: studId}
        });
        const group = await database.Group.findOne({
            where:{groupId: student.groupId}
        });
        if(student&&group){
            var Students = [];
                var mentors = [];
                const students = await database.Student.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    raw:true,
                    order:[
                        ["gpa", "DESC"]
                    ]
                });
                if (students) {
                    for (let i = 0; i < students.length; i++) {
                        Students.push(await StudentService.getStudent(students[i].userId));
                    }
                }else return null;
    
                const mentor = await database.GroupLecturer.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    raw:true
                });
                if (mentor) {
                    for (let i = 0; i < mentor.length; i++) {
                        const user = await database.Lecturer.findOne({
                            where: {
                                lecturerId: mentor[i].lecturerId
                            },
                        });
                        mentors.push(await LecturerService.getLecturerByUserId(user.userId));
                    }
                }
                const groupInfo = {
                    groupId: group.groupId,
                    students: Students,
                    mentors: mentors,
                    name: group.groupName,
                    note: group.groupDesc,
                    councilId: group.councilId,
                    typeCapstone: group.typeCapstone,
                    isScientificGroup: group.isScientificGroup
                }
                return await groupInfo;
        }else return null;
    }

    getGroupByLecturerId = async (lecturerId)=>{
        return await database.GroupLecturer.findAll({
            where: {lecturerId: lecturerId}
        }).then(lecturers=>{
            return  Promise.all(lecturers.map(async lecturer =>{
                const group = await database.Group.findOne({
                    where:{groupId: lecturer.groupId}
                });
                if(lecturer&&group){
                    var Students = [];
                        var mentors = [];
                        const students = await database.Student.findAll({
                            where: {
                                groupId: group.groupId
                            },
                            order:[
                                ["gpa", "DESC"]
                            ]
                        });
                        if (students) {
                            for (let i = 0; i < students.length; i++) {
                                Students.push(await StudentService.getStudent(students[i].userId));
                            }
                        }else return null;
            
                        const mentor = await database.GroupLecturer.findAll({
                            where: {
                                groupId: group.groupId
                            },
                            raw:true
                        });
                        if (mentor) {
                            for (let i = 0; i < mentor.length; i++) {
                                const user = await database.Lecturer.findOne({
                                    where: {
                                        lecturerId: mentor[i].lecturerId
                                    },
                                });
                                mentors.push(await LecturerService.getLecturerByUserId(user.userId));
                            }
                        }
                        const groupInfo = {
                            groupId: group.groupId,
                            students: Students,
                            mentors: mentors,
                            name: group.groupName,
                            note: group.groupDesc,
                            councilId: group.councilId,
                            typeCapstone: group.typeCapstone,
                            isScientificGroup: group.isScientificGroup
                        }
                        return await groupInfo;
                }else return null;
            }))
        })
    }

    deleteGroup = async(groupId)=>{
        const Group = await database.Group.findOne({
            where:{groupId: groupId}
        });
        if(Group){
            await database.Student.update({
                groupId: null
            },{
                where:{groupId: groupId}
            });
            await database.Group.destroy({
                where:{groupId:groupId}
            });
            return true
        }else return false;
    }

    updateGroup = async(data, groupId)=>{
        const isGrouped = await database.Group.findOne({
            where: {groupId: groupId}
        });
        if(isGrouped){
            const group = await database.Group.update({
                groupName: data.groupName,
                groupDesc: data.groupDesc,
                typeCapstone: data.typeCapstone,
                isScientificGroup: data.isScientificGroup
            }, {
                where:{groupId: groupId}
            });
            await database.Student.update({
                groupId: null
            },{
                where:{groupId: groupId}
            });
            data.students.map(async studentId => {
                await database.Student.update(
                    {
                        groupId: groupId
                    },{
                    where: {
                        stuId: studentId,
                        isApproved: true,
                        groupId: null
                    }
                });
            });
            return group;
        }
        return null;
    }
    getAllGroupByTypeCapstone = async (typeCapstone) =>{
        return await Group.findAll({
            where:{typeCapstone},
            order: [
                ["groupName", "ASC"]
            ],
            raw: true
        });
    }
}

module.exports = new GroupService();
