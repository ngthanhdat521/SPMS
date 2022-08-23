import { axios } from "../../HttpClient/HttpClient";
import ProjectService from "../Project/Project";

async function add(stage) {
    let { data, ok, status } = await axios({
        url: `/api/stage/add/${stage.projectId}`,
        data: {
            stageName: stage.stageName,
            stageDesc: stage.stageDesc,
        },
        method: "post",
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Add this stage sucessfully !", isOpen: true };
    else message = { content: "Fail to add this stage !", isOpen: true };

    return { data, isSucess, message };
}

async function edit(stage) {
    console.log(stage);
    let { data, ok, status } = await axios({
        url: `/api/stage/update/${stage.projectId}/${stage.stageId}`,
        data: {
            stageName: stage.stageName,
            stageDesc: stage.stageDesc,
        },
        method: "post",
    });

    console.log(data);

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Edit this stage sucessfully !", isOpen: true };
    else message = { content: "Fail to edit this stage !", isOpen: true };

    return { data, isSucess, message };
}

async function remove(stageId, projectId) {
    let { data, ok, status } = await axios({
        url: `/api/stage/delete/${projectId}/${stageId}`,
        method: "post",
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Delete this stage sucessfully !", isOpen: true };
    else message = { content: "Fail to delete this stage !", isOpen: true };

    return { data, isSucess, message };
}

async function load() {
    let groupResponse = await ProjectService.loadMyGroup();
    let groups = groupResponse.data;
    let stages = [];

    for (let group of groups) {
        let { data, ok, status } = await axios({
            url: `/api/stage/list/${group.project.projectId}`,
            method: "get",
        });

        if (ok && status === 200) stages = stages.concat(data);
    }

    return { data: stages, isSucess: true };
}

async function loadByProject(projectId) {
    let { data, ok, status } = await axios({
        url: `/api/stage/list/${projectId}`,
        method: "get",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

export default { add, edit, remove, load, loadByProject };
