import { axios } from "../../HttpClient/HttpClient";
import StageService from "../../Supporter/Stage/Stage";

async function add(evaluation) {
    let { data, ok, status } = await axios({
        url: `/api/evaluateStage/add`,
        data: evaluation,
        method: "post",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function edit(evaluation) {
    let { data, ok, status } = await axios({
        url: `/api/evaluateStage/update`,
        data: evaluation,
        method: "post",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function load(stageId) {
    let { data, ok, status } = await axios({
        url: `/api/evaluateStage/get/${stageId}`,
        method: "get",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function loadReportByProject() {
    let stageResponse = await StageService.load();
    console.log(stageResponse);
    let stages = stageResponse.data;
    let data = [];

    for (let stage of stages) {
        let evaluationResponse = await load(stage.stageId);
        if(evaluationResponse.data.evaluates.length) data.push(evaluationResponse.data);
    }

    let isSucess = true;

    return { data, isSucess };
}

async function loadByProject(projectId) {
    let stageResponse = await StageService.loadByProject(projectId);
    let stages = stageResponse.data;
    let data = [];

    for (let stage of stages) {
        let evaluationResponse = await load(stage.stageId);
        if(evaluationResponse.data.evaluates.length) data.push(evaluationResponse.data);
    }

    let isSucess = true;

    return { data, isSucess };
}

export default { add, edit, load, loadReportByProject, loadByProject };
