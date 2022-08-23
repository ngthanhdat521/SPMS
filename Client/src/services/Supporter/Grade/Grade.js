import { axios } from "../../HttpClient/HttpClient";

async function assignMentorGrade(gradeData, lecturerId) {
    let {ok, status } = await axios({
        url: `/api/score/mentor/save/${lecturerId}`,
        method: "post",
        data: gradeData,
    });
    let isSuccess = ok && status === 200;
    return { isSuccess };
}
async function assignCouncilGrade(gradeData, councilId, lecturerId){
    let {ok, status } = await axios({
        url: `/api/score/council/save/${councilId}/${lecturerId}`,
        method: "post",
        data: gradeData,
    });
    let isSuccess = ok && status === 200;
    return { isSuccess };
}

export default {
    assignMentorGrade,
    assignCouncilGrade
};
