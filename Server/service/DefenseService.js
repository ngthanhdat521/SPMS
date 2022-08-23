const database = require("../db/postgresql/PostgreSQL");
const LecturerService = require("./LecturerService");
const StudentService = require("./StudentService");
const exceljs = require("exceljs");
/*
Defense
add defense bao gom council and councilMember
*/
class DefenseService {
    createDefense = async (data) => {
        const isDefense = await database.Council.findOne({
            where: {
                councilName: data.councilName
            }
        });
        if (!isDefense) {
            const defense = await database.Council.create({
                councilName: data.councilName,
                councilDesc: data.councilDesc,
                time: data.time,
                location: data.location
            });
            data.lecturers.map(async lecturer => {
                await database.CouncilMember.create({
                    councilId: defense.councilId,
                    lecturerId: lecturer.lecturerId,
                    roleId: lecturer.roleId,
                    workUnit: lecturer.workUnit
                });
            });
            return defense;
        }
        return null;
    }


    assignGroupDefense = async (data) => {
        let mentor = await database.GroupLecturer.findOne({
            where: {
                groupId: data.groupId
            },
            attributes: ['lecturerId'],
            raw: true
        });

        let councilMember = await database.CouncilMember.findAll({
            where: {
                councilId: data.councilId
            },
            attributes: ['lecturerId'],
            raw: true
        });

        let arr = councilMember.map(el => el.lecturerId);

        let isMentor = arr.includes(mentor.lecturerId);

        if (!isMentor) {
            return database.Group.update({
                    councilId: data.councilId
                }, {
                    where: {
                        councilId: null,
                        groupId: data.groupId
                    },

                })
                //phuoc Update
                .then(async count => {
                    //nếu như cập nhật thành công thì
                    if (count[0] > 0) {
                        //update councilId bên bảng score
                        await database.Group.findOne({
                            where: {
                                groupId: data.groupId,
                            },
                            raw: true
                        }).then(async groupData => {
                            if (groupData) {
                                //get stuIds của group 
                                const stuIdsArr = await database.Student.findAll({
                                    where: {
                                        groupId: data.groupId
                                    },
                                    raw: true
                                }).then(datas => datas.map(student => student.stuId));

                                if (stuIdsArr.length > 0)
                                    await database.Score.update({
                                        councilId: groupData.councilId,
                                    }, {
                                        where: {
                                            stuId: stuIdsArr
                                        }
                                    })
                            }
                        })
                    }
                    return count;
                    //đến đây
                });
        }
        return null;
    }

    getAllDefenseToAssign = async () => {
        let dataCouncils = await database.Council.findAll({
                raw: true
            })
            .then(async councils => {
                var councilNoAssignGroup = [];
                await Promise.all(councils.map(async council => {
                    let group = await database.Group.findAll({
                        raw: true,
                        attributes: ['councilId']
                    });
                    let arr = group.map(el => el.councilId);

                    let isAssign = arr.includes(council.councilId);
                    console.log(isAssign);
                    if (!isAssign) {
                        councilNoAssignGroup.push(council);
                    }
                }));
                return councilNoAssignGroup;
            })

        return await Promise.all(dataCouncils.map(async council => {

            let detailMembers = await database.CouncilMember.findAll({
                where: {
                    councilId: council.councilId
                }
            }).then(async members => {
                return await Promise.all(members.map(async member => {
                    let workUnit = member.workUnit;
                    let memberInfo = await database.Lecturer.findOne({
                        where: {
                            lecturerId: member.lecturerId
                        },
                        raw: true
                    }).then(async info => {
                        return await database.User.findOne({
                            where: {
                                userId: info.userId
                            },
                            attributes: ['firstName', 'lastName']
                        });
                    });

                    let firstName = memberInfo.firstName;
                    let lastName = memberInfo.lastName;
                    let lecturerId = member.lecturerId;
                    let role = await database.Role.findOne({
                        where: {
                            roleId: member.roleId
                        },
                        raw: true,
                    });
                    let roleName = role.roleName;
                    let roleId = role.roleId;
                    let dataMember = {
                        lecturerId,
                        workUnit,
                        firstName,
                        lastName,
                        roleId,
                        roleName
                    }
                    return dataMember;
                }));
            });
            return {
                council,
                detailMembers
            }
        }));
    }

    getAllDefense = async () => {
        let dataCouncil = await database.Council.findAll({
                raw: true
            })
            .then(async councils => {
                return await Promise.all(councils.map(async council => {

                    let detailMembers = await database.CouncilMember.findAll({
                        where: {
                            councilId: council.councilId
                        }
                    }).then(async members => {
                        return await Promise.all(members.map(async member => {
                            let workUnit = member.workUnit;
                            var memberInfo = await database.Lecturer.findOne({
                                where: {
                                    lecturerId: member.lecturerId
                                },
                                raw: true
                            }).then(async info => {
                                return await database.User.findOne({
                                    where: {
                                        userId: info.userId
                                    },
                                    raw: true
                                });
                            });
                            let firstName = memberInfo.firstName;
                            let lastName = memberInfo.lastName;
                            let lecturerId = member.lecturerId;
                            let role = await database.Role.findOne({
                                where: {
                                    roleId: member.roleId
                                },
                                raw: true,
                            });
                            let roleName = role.roleName;
                            let roleId = role.roleId;
                            let dataMember = {
                                lecturerId,
                                workUnit,
                                firstName,
                                lastName,
                                roleId,
                                roleName
                            }
                            return dataMember;
                        }));
                    });

                    var group = await database.Group.findOne({
                        where: {
                            councilId: council.councilId
                        },
                        raw: true,
                    });
                    let students = [];
                    let mentors = [];
                    if (group) {
                        let student = await database.Student.findAll({
                            where: {
                                groupId: group.groupId
                            },
                            order: [
                                ["gpa", "DESC"]
                            ],
                            raw: true
                        });
                        if (student) {

                            for (let i = 0; i < student.length; i++) {
                                students.push(await StudentService.getStudent(student[i].userId));
                            }
                        }

                        let mentor = await database.GroupLecturer.findAll({
                            where: {
                                groupId: group.groupId
                            },
                            raw: true
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
                    } else return null;

                    return {
                        council,
                        students,
                        mentors,
                        detailMembers,
                        group
                    }
                }))
            });
        return (await dataCouncil).filter(function (el) {
            return el != null;
        });

    }

    getAllDefenseOfCap = async (typeOfCap) => {
        const defense = await this.getAllDefense();
        return defense.filter((el) =>
            el.group.typeCapstone == typeOfCap
        );
    }

    getAllDefenseByLecturerId = async (lecturerId) => {
        let dataCouncil = await database.CouncilMember.findAll({
            where: {
                lecturerId: lecturerId
            },
            raw: true,
        }).then(async datas => {
            return await Promise.all(datas.map(async data => {
                return await database.Council.findOne({
                    where: {
                        councilId: data.councilId
                    }
                });
            }));
        })
        return await Promise.all(dataCouncil.map(async council => {
            let detailMembers = await database.CouncilMember.findAll({
                where: {
                    councilId: council.councilId
                }
            }).then(async members => {
                return await Promise.all(members.map(async member => {
                    let workUnit = member.workUnit;
                    let memberInfo = await database.Lecturer.findOne({
                        where: {
                            lecturerId: member.lecturerId
                        },
                        raw: true
                    }).then(async info => {
                        return await database.User.findOne({
                            where: {
                                userId: info.userId
                            },
                            attributes: ['firstName', 'lastName']
                        });
                    });
                    let firstName = memberInfo.firstName;
                    let lastName = memberInfo.lastName;
                    let lecturerId = member.lecturerId;
                    let role = await database.Role.findOne({
                        where: {
                            roleId: member.roleId
                        },
                        raw: true,
                    });
                    let roleName = role.roleName;
                    let roleId = role.roleId;
                    let dataMember = {
                        lecturerId,
                        workUnit,
                        firstName,
                        lastName,
                        roleId,
                        roleName
                    }

                    return dataMember;
                }));
            });

            var group = await database.Group.findOne({
                where: {
                    councilId: council.councilId
                },
                raw: true,
                attributes: ['groupId']
            });

            let students = [];
            let mentors = [];
            let student = await database.Student.findAll({
                where: {
                    groupId: group.groupId
                },
                order: [
                    ["gpa", "DESC"]
                ],
                raw: true
            });
            if (student) {

                for (let i = 0; i < student.length; i++) {
                    students.push(await StudentService.getStudent(student[i].userId));
                }
            }

            let mentor = await database.GroupLecturer.findAll({
                where: {
                    groupId: group.groupId
                },
                raw: true
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
            return {
                council,
                students,
                mentors,
                detailMembers
            }
        }))
    }

    deleteDefense = async (councilId) => {
        const defense = database.Council.findOne({
            where: {
                councilId
            }
        });
        if (defense) {
            await database.Group.update({
                councilId: null
            }, {
                where: {
                    councilId: councilId
                }
            })
            await database.Council.destroy({
                where: {
                    councilId: councilId
                },
                raw: true
            });
            return defense
        }
        return null;
    }

    updateDefense = async (data, councilId) => {
        let council = await database.Council.findOne({
            where: {
                councilId: councilId
            },
            raw: true
        });
        if (council) {
            await database.Council.update({
                councilName: data.councilName,
                councilDesc: data.councilDesc,
                time: data.time,
                location: data.location
            }, {
                where: {
                    councilId: councilId
                }
            });
            await database.CouncilMember.destroy({
                where: {
                    councilId: councilId
                }
            });
            let group = await database.Group.findOne({
                where: {
                    councilId: councilId
                },
                raw: true
            });
            let mentor = await database.GroupLecturer.findOne({
                where: {
                    groupId: group.groupId
                },
                attributes: ['lecturerId'],
                raw: true
            });
            let arr = data.lecturers.map(member => member.lecturerId);
            let isMentor = arr.includes(mentor.lecturerId);
            if (!isMentor) {
                console.log("acb");
                data.lecturers.map(async lecturer => {
                    await database.CouncilMember.create({
                        councilId: councilId,
                        lecturerId: lecturer.lecturerId,
                        roleId: lecturer.roleId,
                        workUnit: lecturer.workUnit
                    });
                });
            } else return null;
            return council;
        }
        return null
    }

    
    // exportDefense = async()=>{
    //     const workbook = new exceljs.Workbook();
    //     const capstone1_worksheet = workbook.addWorksheet("Defense Capstone 1");
    //     const capstone2_worksheet = workbook.addWorksheet("Defense Capstone 2");
    //     const path = "./files";

    //     const columnsWorksheet = [
    //         {
    //             header: "Defense",
    //             key: "councilName",
    //         },
    //         {
    //             header: "Last Name",
    //             key: "councilName",
    //         },
    //         {
    //             header: "First Name",
    //             key: "councilName",
    //         },
    //         {
    //             header: "Work unit",
    //             key: "workUnit",
    //         },
    //         {
    //             header: "Role",
    //             key: "roleName",
    //         },
    //         {
    //             header: "Role",
    //             key: "roleName",
    //         },
    //         {
    //             header: "Time",
    //             key: "time",
    //         },
    //         {
    //             header: "Student",
    //             key: "student",
    //         },
    //         {
    //             header: "Student Code",
    //             key: "stuCode",
    //         },
    //         {
    //             header: "Mentor",
    //             key: "mentor",
    //         },
    //     ]
    //     capstone1_worksheet.columns = columnsWorksheet;
    //     capstone2_worksheet.columns = columnsWorksheet;
    //     await this.getAllDefense()
    //     .then(async defenses =>{
    //         let dataRow = [];
    //         for (const defense of defenses) {
    //             let objectData = {};
    //             for (let evaluator of defense.detailMembers) {
    //                delete evaluator.roleId;
    //                delete evaluator.lecturerId
    //                objectData = {...objectData, evaluator}
    //             }

    //         }
    //     })

    // }
}

module.exports = new DefenseService();