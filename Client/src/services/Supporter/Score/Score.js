import { axios } from "../../HttpClient/HttpClient";

async function load(groupId) {
    let { data, ok, status } = await axios({
        url: `/api/score/group/get/${groupId}`,
        method: "get",
    });

    let councilResponse = await axios({
        url: `/api/defense/getAllDefense`,
        method: "get",
    });

    data.detailMembers = councilResponse.data.find((council) => council.council.councilId === data.councilData.councilId).detailMembers;

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

export default { load };
