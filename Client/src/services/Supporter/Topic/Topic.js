import { axios } from "../../HttpClient/HttpClient";

async function add(topic) {
    let info = JSON.parse(localStorage.getItem("info"));
    let topicData = new FormData();
    topicData.append("projectName", topic.projectName);
    topicData.append("projectDesc", topic.projectDesc);
    topicData.append("lecturerId", info.lecturerId);
    topic.files.map((file) => {
        topicData.append("document", file);
    });

    let { data, ok, status } = await axios({
        url: "/api/lecturer/add/topicTemplate",
        data: topicData,
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Add this topic sucessfully !", isOpen: true };
    else message = { content: "Fail to add this topic !", isOpen: true };

    return { data, isSucess, message };
}

async function edit(topic) {
    console.log(topic);
    let info = JSON.parse(localStorage.getItem("info"));
    let topicData = new FormData();
    topicData.append("projectName", topic.projectName);
    topicData.append("projectDesc", topic.projectDesc);
    topic.deleteFileIds.map((id) => {
        topicData.append("deleteFileIds", id);
    });
    topic.files.map((file) => {
        topicData.append("document", file);
    });

    let { data, ok, status } = await axios({
        url: `/api/lecturer/update/topicTemplate/${info.lecturerId}/${topic.projectId}`,
        data: topicData,
        method: "post",
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Edit this topic sucessfully !", isOpen: true };
    else message = { content: "Fail to edit this topic !", isOpen: true };

    return { data, isSucess, message };
}

async function remove(projectId) {
    let { data, ok, status } = await axios({
        url: `/api/project/delete/${projectId}`,
        method: "post",
    });

    let message = {};
    let isSucess = ok && status === 200;

    if (isSucess)
        message = { content: "Delete this topic sucessfully !", isOpen: true };
    else message = { content: "Fail to delete this topic !", isOpen: true };

    return { data, isSucess, message };
}

async function load() {
    let { data, ok, status } = await axios({
        url: "/api/project/topicTemplate/get",
        method: "get",
    });

    data = data.map((topic) => {
        topic.files = topic.files.map((file) => {
            file.name = file.fileName.substring(
                file.fileName.indexOf("-") + 1,
                file.fileName.length
            );
            return file;
        });

        return topic;
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

export default { add, edit, remove, load };
