import React from "react";
import Group from "../Group/Group.component";
import styles from "./GroupContainer.module.scss";

function GroupContainer({ group }) {
    let leader = `Leader : ${
        group.project
            ? group.project.leader.firstName +
              " " +
              group.project.leader.lastName
            : "No leader"
    }`;

    let note = group.project ? group.project.note : "Untitled";

    return (
        <Group {...group} fullName={leader}>
            <div className="w-100">
                <div className={styles["group-container_comment"] + " mb-3"}>
                    <div className="row">
                        <div className="col-3">
                            <span>Note</span>
                            <span className="ml-2">:</span>
                        </div>
                        <div className="col-9">
                            <span className="ml-2">{note}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Group>
    );
}

export default GroupContainer;
