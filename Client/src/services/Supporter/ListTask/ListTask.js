import { axios } from "../../HttpClient/HttpClient";
import TaskService from "../Task/Task";
async function add(stageId, listTask) {
    let { data, ok, status } = await axios({
        url: `/api/listTask/add/${stageId}`,
        data: listTask,
        method: "post",
    });

    let isSucess = ok && status === 200;
    let message = {};

    if (isSucess)
        message = { isOpen: true, content: "Add this list successfully !" };
    else message = { isOpen: true, content: "Fail to add this list !" };

    return { data, isSucess, message };
}

async function edit(stageId, listTask) {
    let { data, ok, status } = await axios({
        url: `/api/listTask/update/${stageId}/${listTask.listTaskId}`,
        data: {
            title: listTask.title,
        },
        method: "post",
    });

    let isSucess = ok && status === 200;
    let message = {};

    if (isSucess)
        message = { isOpen: true, content: "Edit this list successfully !" };
    else message = { isOpen: true, content: "Fail to edit this list !" };

    return { data, isSucess, message };
}

async function remove(stageId, listTaskId) {
    let { data, ok, status } = await axios({
        url: `/api/listTask/delete/${stageId}/${listTaskId}`,
        method: "post",
    });
    console.log(data);

    let isSucess = ok && status === 200;
    let message = {};

    if (isSucess)
        message = { isOpen: true, content: "Delete this list successfully !" };
    else message = { isOpen: true, content: "Fail to delete this list !" };

    return { data, isSucess, message };
}

async function load(stageId) {
    let { data, ok, status } = await axios({
        url: `/api/listTask/list/${stageId}`,
        method: "get",
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

async function loadListTask(stageId) {
    let listTaskResponse = await load(stageId);
    let listTasks = listTaskResponse.data;

    for (let listTask of listTasks) {
        let taskResponse = await TaskService.load(stageId, listTask.listTaskId);
        if (taskResponse.isSucess) listTask.tasks = taskResponse.data;
    }

    return { data: listTasks, isSucess: true };
}

export default { add, edit, remove, load, loadListTask };
