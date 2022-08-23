import { axios, download } from "../../HttpClient/HttpClient";
import GroupService from "../Group/Group";
import StudentService from "../Student/Student";

async function submit(topic, hasTopic) {
    let info = JSON.parse(localStorage.getItem("info"));
    let user = JSON.parse(localStorage.getItem("user"));

    let resultMessage = {};

    if (hasTopic) {
        let { message } = await updateTopic(topic);
        resultMessage = message;
    } else {
        let groupResponse = await GroupService.loadGroupById(user.userId);
        topic.groupId = groupResponse.data.groupId;

        let { message } = await StudentService.addTopic(info.stuId, topic);
        resultMessage = message;
    }

    return { message: resultMessage };
}

async function updateTopic(project) {
    let { data, ok, status } = await axios({
        url: `/api/project/update/topic/${project.projectId}`,
        data: project,
        method: "post",
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Edit this topic sucessfully !", isOpen: true };
    else message = { content: "Fail to edit this topic !", isOpen: true };

    return { data, isSucess, message };
}

async function remove(topicId) {
    let { data, ok, status } = await axios({
        url: `/api/topic/delete/${topicId}`,
        method: "post",
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Delete this topic sucessfully !", isOpen: true };
    else message = { content: "Fail to delete this topic !", isOpen: true };

    return { data, isSucess, message };
}

async function load(typeCapstone) {
    let { data, ok, status } = await axios({
        url: `/api/project/get/${typeCapstone}`,
        method: "get",
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

async function loadAll() {
    let caps1Response = await load(1);
    let caps2Response = await load(2);

    let data = [];

    let isSucess = caps1Response.isSucess && caps2Response.isSucess;

    if (isSucess) {
        data = caps1Response.data;
        data = data.concat(caps2Response.data);
    }

    return { data, isSucess };
}

async function getTopic(userId) {
    let { data, isSucess } = await loadAll();
    let topic = null;

    data.map((group) => {
        if (group.project) {
            let isMember = group.project.members.some(
                (member) => member.userId === userId
            );
            let isLeader = group.project.leader.userId === userId;

            if (isMember || isLeader) topic = group.project;
        }
    });

    data = topic;

    return { data, isSucess };
}

async function getProjects(userId) {
    let { data, isSucess } = await loadAll();
    let projects = [];

    data.map((group) => {
        if (group.project) {
            let isMember = group.project.members.some(
                (member) => member.userId === userId
            );
            let isLeader = group.project.leader.userId === userId;

            if (isMember || isLeader) projects.push(group.project);
        }
    });

    data = projects;

    return { data, isSucess };
}

async function approve(projectId) {
    let { data, ok, status } = await axios({
        url: `/api/project/approved/${projectId}`,
        method: "post",
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

async function cancel(projectId) {
    let { data, ok, status } = await axios({
        url: `/api/project/cancel/${projectId}`,
        method: "post",
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

async function reject(projectId) {
    let { data, ok, status } = await axios({
        url: `/api/project/reject/${projectId}`,
        method: "post",
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

async function loadMyGroup() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { data, isSucess } = await loadAll();
    let isMentor = user.roleUser.includes("mentor");

    data = data.filter((group) => {
        let project = group.project;
        let isMember = false;
        let isLeader = false;
        if (project) {
            if (isMentor) {
                isMember = group.mentor.some(
                    (mentor) => mentor.userId === user.userId
                );
            } else {
                isMember = project.members.some(
                    (member) => member.userId === user.userId
                );
            }
            isLeader = group.project.leader.userId === user.userId;
            project.members.push(project.leader);
        }
        return isMember || isLeader;
    });

    return {
        data,
        isSucess,
    };
}

async function isLeader(projectId) {
    let user = JSON.parse(localStorage.getItem("user"));
    let { data, isSucess } = await loadProject(projectId);
    console.log(data);

    if(isSucess) return user.userId === data.leader.userId;
    else return false;
}

async function loadProject(projectId) {
    let { data, ok, status } = await axios({
        url: `/api/project/detail/${projectId}`,
        method: "get",
    });

    data.member.push(data.leader);

    let isSucess = ok && status === 200;

    return {
        data,
        isSucess,
    };
}

async function exportFile() {
    let { data, ok, status } = await axios({
        url: `/api/project/exportFile`,
        method: "get",
    });

    let isSucess = ok && status == 200;

    if (isSucess)
        download({
            url: `/api/fileStorage/download/${data}`,
        });
}

export default {
    submit,
    updateTopic,
    remove,
    loadAll,
    approve,
    reject,
    cancel,
    getTopic,
    loadMyGroup,
    exportFile,
    getProjects,
    loadProject,
    isLeader
};
