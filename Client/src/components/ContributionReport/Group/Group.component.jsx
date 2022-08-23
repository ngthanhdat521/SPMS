import React from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import styles from "./Group.module.scss";
import { Link } from "react-router-dom";

const Group = ({ project, groupName, groupDesc, typeCapstone, isScientificGroup }) => {
    let url = project ? `/dashboard/contribution-report?projectId=${project.projectId}` : "/dashboard/contribution-report";

    return (
        <Link to={url}>
            <div className={styles["group"]}>
                <div className="my-auto">
                    <div className={styles["group_box"] + " light-bg mb-4"}>
                        <AssignmentOutlinedIcon
                            className={styles["group_icon"] + " default-text"}
                        />
                    </div>
                    <h5>{groupName} ({isScientificGroup ? "Scientific Group" : "Normal"})</h5>
                    <p>Capstone {typeCapstone}</p>
                    <div className={styles["group_line"]}></div>
                    <div>
                        <span style={{ color: "#64748b" }}>{groupDesc}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Group;
