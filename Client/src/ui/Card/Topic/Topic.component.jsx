import React, { useState } from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import styles from "./Topic.module.scss";
import DateConverter from "../../../services/Converter/DateConverter";
import Tooltip from "@mui/material/Tooltip";
import GroupService from "../../../services/Supporter/Group/Group";

function Topic({
    project,
    groupId,
    groupName,
    typeCapstone,
    fullName,
    children,
    isScientificGroup,
}) {
    const [group, setGroup] = useState({
        students: [],
    });
    
    project = project
        ? project
        : { projectName: "Untitled", projectDesc: "Untitled" };

    let createdAt = project ? project.createdAt : "";
    let amount = project && project?.members ? project.members.length : 0;

    return (
        <div className={styles["topic"]}>
            <h3>{project.projectName}</h3>
            <p className={styles["topic_title"] + " mb-0"}>
                Group {groupName} in Capstone {typeCapstone} (
                {isScientificGroup ? "Scientific Research" : "Normal"})
            </p>
            <p className={styles["topic_title"]}>{fullName}</p>

            <Tooltip title={project.projectDesc}>
                <p className={styles["topic_desc"]}>{project.projectDesc}</p>
            </Tooltip>
            <div className="w-100 d-flex justify-content-between light-text">
                <div className="d-flex align-items-center">
                    <PeopleAltOutlinedIcon className={styles["topic_icon"]} />
                    <span className={styles["topic_sub"] + " ml-2"}>
                        {amount} members
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <AccessTimeOutlinedIcon className={styles["topic_icon"]} />
                    <span className={styles["topic_sub"] + " ml-2"}>
                        {DateConverter.parseShortDateTime(createdAt)}
                    </span>
                </div>
            </div>
            <div className="d-flex mt-3">{children}</div>
        </div>
    );
}

export default Topic;
