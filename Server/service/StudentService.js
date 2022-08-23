const database = require("../db/postgresql/PostgreSQL");
const generatePassword = require("../helper/GeneralPassword");
const { sendEmailUser, studentEmail } = require("../helper/SendEmail");
const RoleService = require("./RoleService");
const UserRoleService = require("./UserRoleService");
const bcrypt = require('bcrypt');


class StudentService {
    //userId undefine 
    registerExecuteProject = async (student) => {

        //check student was in db
        let data = await database.User.findOne({
            where: {
                email: student.email
            }, raw: true
        });

        if (!data) {
            let userId;
            const user = await database.User.create({
                firstName: student.firstName,
                lastName: student.lastName,
                dateOfBirth: student.dateOfBirth,
                email: student.email,
                password: null,
                phone: student.phone,
                majorId: student.majorId,
            }).then(data => {
                userId = data.userId;
            });

            const StudentData = await database.Student.findOrCreate({
                where: {
                    userId
                },
                defaults: {
                    stuCode: student.stuCode,
                    gpa: student.gpa,
                    courseCreadits: student.courseCreadits,
                    codeLevel: student.codeLevel,
                    note: student.note,
                    typeCapstone: student.typeCapstone,
                    class: student.class,
                    isApproved: student.isApproved,
                    userId: userId,
                    class: student.class
                }
            });
            let roleId;
            await RoleService.getRoleByRoleName("student")
                .then(data => {
                    roleId = data.roleId;
                })
            if (userId && roleId) {

                await UserRoleService.addUserRole({
                    userId,
                    roleId
                });

                let check = StudentData.find(userEle => {
                    return typeof userEle === 'boolean';
                });
                return check ? {
                    user: user,
                    StudentData: StudentData[0]
                } : "STUDENT IS IN DB";
            }
            return null;
        }
        return null;
    }
    getStudent = async (userId) => {
        let userInfo = await database.User.findOne({
            where: {
                userId: userId
            },
            raw:true
        });
        let studentInfo = await database.Student.findOne({
            where: {
                userId: userId
            },
            raw:true
        });
        delete userInfo.password; 
        return {
            userInfo: userInfo,
            studentInfo: studentInfo
        }
    }

    getAllStudent = async () => {
        return await database.Student.findAll({where:{isApproved: true}}).then(async datas => {
            return await Promise.all(datas.map(async data => {
                const user = database.User.findOne({
                    where: {
                        userId: data.userId
                    },
                    raw:true
                }).then(userInfo => {
                    let info = {
                        ...userInfo,
                        ...data.toJSON()
                    }
                    delete info.password;
                    return info;
                });
                
                return await user;
            }))
        });
    }

    getAllStudentGood = async () => {
        const goodStudent = await database.Student.findAll({
            where:{groupId: null}
        }).then(async datas => {
            return await Promise.all(datas.map(async data => {
                
                if(data.gpa <=4 && data.gpa >= 3.6){
                    const user = database.User.findOne({
                        where: {
                            userId: data.userId
                        },
                        raw:true
                    }).then(userInfo => {
                        let info = {
                            ...userInfo,
                            ...data.toJSON()
                        }
                        delete info.password;
                        return info;
                    });
                return await user;
                }
                return null;
                
            }))
        });

        var filtered = goodStudent.filter(function (el) {
            return el != null;
          });
        return filtered;
    }

    approveStudent = async (studId) => {

        return await database.Student.findOne({
            where: {
                stuId: studId
            },
            raw: true
        }).then(async student => {
            let countRow = await database.Student.update({
                isApproved: true
            }, {
                where: {
                    stuId: studId
                },
            });

            if(countRow>0){
                const password = generatePassword();
                const passwordBcrypt = bcrypt.hashSync(password, 10);
                await database.User.update({
                    password: passwordBcrypt
                }, {
                    where: {
                        userId: student.userId
                    }
                });

                const info = await database.User.findOne({
                    where: {
                        userId: student.userId
                    },
                    raw: true
                });
                const sendInfo = {
                    firstName: info.firstName,
                    email: info.email,
                    password: password,

                }
                await sendEmailUser(sendInfo, studentEmail);

                //Phuoc update
                // tạo record score
                await database.Score.create({
                    stuId: studId
                })
                //đến đây
                return countRow;
            }

        })

    }

    checkStudentisApproved = async (stuId) =>{
        return await database.Student.findOne({
            where:{
                stuId: stuId
            },
            raw: true
        }).then(data => {
            return data && data.isApproved?true:false
        });
    }

    //Phuoc viet
    //kiểm tra đã được approve chưa
    //Kiểm tra studId và leaderId có chung nhóm không.
    //Kiểm tra nhóm đã đăng ký đồ án chưa
    //Nếu chưa => tạo đồ án
    ////update leaderId trong ProjectModel
    createTopic = async (stuId, project) =>{
        //check student submit topic
        if( await this.checkStudentisApproved(stuId) &&  await this.checkStudentisApproved(project.leaderId)){
           //Kiểm tra studId và leaderId có chung nhóm không.
            const groupIdStuId = await database.Student.findOne({where:{stuId}, raw: true})
                .then(data => data?data.groupId:null)
            const groupIdleaderId = await database.Student.findOne({where:{stuId:project.leaderId}, raw: true})
                .then(data => data?data.groupId:null)
            //chung nhóm
            if(groupIdStuId === groupIdleaderId && groupIdStuId === project.groupId && groupIdleaderId === project.groupId){
                //Kiểm tra nhóm đã đăng ký đồ án chưa
                const checkHasProject = await database.Project.findOne({
                    where:{
                        groupId: groupIdStuId,
                    }, raw: true
                }).then(data => data?true:false);
                // console.log(checkHasProject)
                //chưa có
                if(!checkHasProject){
                    //tạo project
                    const procjectBody = {
                        projectName: project.projectName,
                        projectDesc: project.projectDesc,
                        note: project.note,
                        groupId: groupIdleaderId,
                        leaderId: project.leaderId,
                        isApproved: "pending",
                        // isRegisterd: true,
                    }
                    const projectData = await database.Project.findOrCreate({
                        where:{
                            groupId: procjectBody.groupId,
                        },
                        defaults: procjectBody,
                        raw: true
                    })
                    // console.log(projectData)
                    //nếu Project đã có thì projectData sẽ không có dữ liệu
                    const checkProjectInserted = projectData.find(proEle => typeof proEle === "boolean")
                    //nếu đã insert thành công
                    if(checkProjectInserted){
                        return true;
                    }
                    return false;
                }
                //đã có
                return "HAS PROJECT";
            }
            //không chung nhóm
            return "NOT SAME GROUP"
        }
        //Student hoặc leader chưa approved
        return "UNAPPROVED STUDENT OR LEADER";
    }

    getAllStudentK = async () => {
        const goodStudent = await database.Student.findAll({
            where:{groupId: null}
        }).then(async datas => {
            return await Promise.all(datas.map(async data => {
                
                if(data.gpa <=3.5 && data.gpa >= 3.2){
                    const user = database.User.findOne({
                        where: {
                            userId: data.userId
                        },
                        raw:true
                    }).then(userInfo => {
                        let info = {
                            ...userInfo,
                            ...data.toJSON()
                        }
                        delete info.password;
                        return info;
                    });
                return await user;
                }
                return null;
                
            }))
        });

        var filtered = goodStudent.filter(function (el) {
            return el != null;
          });
        return filtered;
    }

    getAllStudentTB = async () => {
        const goodStudent = await database.Student.findAll({
            where:{groupId: null}
        }).then(async datas => {
            return await Promise.all(datas.map(async data => {
                
                if(data.gpa <=3.5 && data.gpa >= 3.2){
                    const user = database.User.findOne({
                        where: {
                            userId: data.userId
                        },
                        raw:true
                    }).then(userInfo => {
                        let info = {
                            ...userInfo,
                            ...data.toJSON()
                        }
                        delete info.password;
                        return info;
                    });
                return await user;
                }
                return null;
                
            }))
        });

        var filtered = goodStudent.filter(function (el) {
            return el != null;
          });
        return filtered;
    }

    getAllStudentY = async () => {
        const goodStudent = await database.Student.findAll({
            where:{groupId: null}
        }).then(async datas => {
            return await Promise.all(datas.map(async data => {
                
                if(data.gpa <=3.1){
                    const user = database.User.findOne({
                        where: {
                            userId: data.userId
                        },
                        raw:true
                    }).then(userInfo => {
                        let info = {
                            ...userInfo,
                            ...data.toJSON()
                        }
                        delete info.password;
                        return info;
                    });
                return await user;
                }
                return null;
            }))
        });

        var filtered = goodStudent.filter(function (el) {
            return el != null;
          });
        return filtered;
    }

    getStudentByStuId = async (stuId) =>{
        return await database.Student.findOne({
            where:{
                stuId
            }, 
            raw: true,
            attributes: [
                "stuId",
                "stuCode",
                "class",
                "groupId",
                "userId"
            ]
        }).then( async data =>{
            if(data){
                data = await database.User.findOne({
                    where: {
                        userId: data.userId
                    }, raw: true,
                    attributes: [
                        "firstName",
                        "lastName",
                        "dateOfBirth",
                        "email",
                        "phone"
                    ]
                }).then(userData =>{
                    if(userData)
                        userData = {
                            ...userData,
                            ...data
                        }
                    return userData;
                })
            }
            return data;
        })
    }
}

module.exports = new StudentService();