import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectService from "../../../services/Supporter/Project/Project";
import FixedForm from "../../../ui/Form/FixedForm/FixedForm.component";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import Textarea from "../../../ui/Form/Textarea/Textarea.component";
import EvaluationStageService from "../../../services/Supporter/EvaluationStage/EvaluationStage";
import BasicAlert from "../../../ui/Alert/BasicAlert/BasicAlert.component";

// import styles from "./EvaluationBoard.module.scss";

function EvaluationBoard({
    isOpen = true,
    onClose,
    projectId,
    stageId,
    updateMessage,
}) {
    const [members, setMembers] = useState([]);
    const [message, setMessage] = useState("");
    const [isNew, setIsNew] = useState(true);

    const handleChange = (event, index, name) => {
        let { value } = event.target;
        members[index][name] = value;
        setMembers(members);
        setMessage("");
    };

    const submit = async () => {
        let sum = 0;
        for (let member of members) sum += parseFloat(member.percentage);
        if (sum === 100) {
            let isSucess = false;
            if (isNew) {
                let response = await EvaluationStageService.add(members);
                isSucess = response.isSucess;
            } else {
                let response = await EvaluationStageService.edit(members);
                isSucess = response.isSucess;
            }
            setMessage("");
            updateMessage({
                isOpen: true,
                content: isSucess
                    ? "Submit successfully !"
                    : "Fail to submit !",
            });
        } else setMessage("Summary of all members must be 100% !");
    };

    const onLoad = async () => {
        let { data, isSucess } = await ProjectService.loadProject(projectId);
        let evaluationStageResponse = await EvaluationStageService.load(
            stageId
        );
        for (let member of data.member) {
            member.stageId = stageId;
            member.percentage = 0;
            member.comment = "";
            for (let evaluation of evaluationStageResponse.data.evaluates) {
                if (member.userId === evaluation.userId) {
                    member.percentage = evaluation.evaluate.percentage;
                    member.comment = evaluation.evaluate.comment;
                }
            }
        }
        setIsNew(evaluationStageResponse.data.evaluates.length === 0);
        if (isSucess) setMembers(data.member);
    };

    useEffect(onLoad, []);

    if (isOpen) {
        return (
            <div>
                <FixedForm onClose={onClose}>
                    {message && (
                        <div className="mb-3">
                            <BasicAlert severity="warning">
                                {message}
                            </BasicAlert>
                        </div>
                    )}
                    <h5>Contribution</h5>
                    {members.map((member, index) => (
                        <div key={index}>
                            <div className="form-group">
                                <label>
                                    Percent of {member.firstName}{" "}
                                    {member.lastName}
                                </label>
                                <Textbox
                                    onChange={(event) =>
                                        handleChange(event, index, "percentage")
                                    }
                                    regex={/^[\d]{1,}$/}
                                    defaultValue={member.percentage}
                                    message="Percentage must be digits !"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Comment of {member.firstName}{" "}
                                    {member.lastName}
                                </label>
                                <Textarea
                                    onChange={(event) =>
                                        handleChange(event, index, "comment")
                                    }
                                    placeholder="Contribution"
                                    regex={/^.{1,}$/}
                                    defaultValue={member.comment}
                                    message="Comment must be minimum 1 character !"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-end">
                        <Button onClick={submit} variant="contained">
                            Submit
                        </Button>
                    </div>
                </FixedForm>
            </div>
        );
    }
    return "";
}

export default EvaluationBoard;
