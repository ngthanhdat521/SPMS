import { axios } from "../../HttpClient/HttpClient";

async function edit(userId, profile) {
    let { data, status, ok } = await axios({
        url: `/api/lecturer/update/${userId}`,
        data: profile,
        method: "post",
    });

    let isSucess = ok && status === 200;
    let message = {};
    if (isSucess)
        message = { isOpen: true, content: "Edit this profile sucessfully !" };
    else message = { isOpen: true, content: "Fail to edit this profile !" };
    
    return { data, isSucess, message };
}

async function getById(userId) {
    let { data, status, ok } = await axios({
        url: `/api/lecturer/get/${userId}`,
        method: "get",
    });
    return { data, isSuccess: ok && status === 200 };
}

export default { getById, edit };
