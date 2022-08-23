import { axios } from "../../HttpClient/HttpClient";

async function add(group) {
    let { data, ok, status } = await axios({
        url: "/api/group/add",
        data: group,
        method: "post",
    });

    let statusRes = ok && status == true;

    return { data, ok: statusRes };
}

async function update(group) {
    let { data, ok, status } = await axios({
        url: `/api/group/edit/${group.groupId}`,
        data: group,
        method: "post",
    });

    let statusRes = ok && status == true;

    return { data, ok: statusRes };
}

async function remove(groupId) {
    let { data, ok, status } = await axios({
        url: `/api/group/${groupId}`,
        method: "delete",
    });

    let isSucess = ok && status == 200;
    let message = {};
    if (isSucess)
        message = { isOpen: true, content: "Delete this group sucessfully !" };
    else message = { isOpen: true, content: "Fail to delete this group !" };
    
    return { data, isSucess, message };
}

async function load() {
    let { data, ok, status } = await axios({
        url: "/api/group/",
        method: "get",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function loadById(groupId) {
    let { data, isSucess } = await load();

    data = data.filter((row) => row.groupId === groupId);

    return { data, isSucess };
}

async function loadByUserId(userId) {
    let { data, isSucess } = await load();
    let arr = [];

    if (isSucess) {
        data.map((group) => {
            group.students.map((student) => {
                if (student.userInfo.userId === userId) {
                    group.students.map((s) => {
                        s.userInfo.stuId = s.studentInfo.stuId;
                        arr.push(s.userInfo);
                    });
                }
            });
        });
    }

    data = arr;

    return { data, isSucess };
}

async function loadGroupById(userId) {
    let { data, isSucess } = await load();

    let myGroup = [];

    if (isSucess) {
        data.map((group) => {
            group.students.map((student) => {
                if (student.userInfo.userId === userId) myGroup.push(group);
            });
        });
    }

    data = myGroup;

    return { data, isSucess };
}

export default {
    add,
    update,
    remove,
    load,
    loadById,
    loadByUserId,
    loadGroupById,
};
