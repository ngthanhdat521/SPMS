import { axios } from "../../HttpClient/HttpClient";

async function getById(userId) {
    let { data, status, ok } = await axios({
        url: `/api/student/${userId}`,
        method: "get",
    });
    return { data, isSuccess: ok && status === 200 };
}

async function addTopic(stuId, topic) {
    let { data, status, ok } = await axios({
        url: `/api/student/registerTopic/${stuId}`,
        data: topic,
        method: "post",
    });

    let isSucess = ok && status === 200;
    console.log(data);
    let message;
    if (isSucess)
        message = { isOpen: true, content: "Add this topic successfully !" };
    else message = { isOpen: true, content: "Fail to add this topic !" };

    return { data, isSucess, message };
}

export default { getById, addTopic };
