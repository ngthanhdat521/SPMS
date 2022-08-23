import { Button } from "@mui/material";
import React from "react";
import Project from "../../../services/Supporter/Project/Project";
import Topic from "../../../ui/Card/Topic/Topic.component";
import TransparentTextbox from "../../../ui/Form/TransparentTextbox/TransparentTextbox.component";
import styles from "./TopicContainer.module.scss";

function TopicContainer({ topic, updateTopicByValue }) {
    const approveTopic = async () => {
        if(topic.project) await Project.approve(topic.project.projectId);
        updateTopicByValue("approved");
    };

    const cancelTopic = async () => {
        if(topic.project) await Project.cancel(topic.project.projectId);
        updateTopicByValue("pending")
    };

    const rejectTopic = async () => {
        if(topic.project) await Project.reject(topic.project.projectId);
        updateTopicByValue("rejected")
    };

    let leader = `Leader : ${
        topic.project
            ? topic.project.leader.firstName +
              " " +
              topic.project.leader.lastName
            : "No leader"
    }`;

    let note = topic.project ? topic.project.note : "Untitled";
    
    let isApproved = topic.project ? topic.project.isApproved : ""; 

    return (
        <Topic {...topic} fullName={leader}>
            <div className="w-100">
                <div className={styles["topic-container_comment"] + " mb-3"}>
                    <div className="row">
                        <div className="col-3">
                            <span>Note</span>
                            <span className="ml-2">:</span>
                        </div>
                        <div className="col-9">
                            <TransparentTextbox
                                onSave={(v) => console.log(v)}
                                defaultValue={note}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-end">
                    <Button
                        onClick={approveTopic}
                        disabled={isApproved === "approved"}
                        variant="contained"
                    >
                        {isApproved === "approved" ? "Approved" : "Approve"}
                    </Button>
                    <Button
                        onClick={cancelTopic}
                        color="warning"
                        className="mx-2"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={rejectTopic}
                        color="error"
                        variant="contained"
                        disabled={isApproved === "reject"}
                    >
                        {isApproved === "rejected" ? "Rejected" : "Reject"}
                    </Button>
                </div>
            </div>
        </Topic>
    );
}

export default TopicContainer;
