import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./Activities.module.scss";
import Activity from "../Activity/Activity.component";

function Activities({ isOpen = false, onClose }) {
    const [activities, setActivities] = useState([
        {
            userId: "1",
            firstName: "Le",
            lastName: "Long",
            actionName: "add a task",
            createdOn: new Date().toISOString(),
        },
    ]);

    if (isOpen)
    {
        return (
            <div className={styles["activities"]}>
                <div className="d-flex justify-content-between my-3 px-3">
                    <div></div>
                    <h5 className="text-center mb-0">Menu</h5>
                    <CloseOutlinedIcon
                        onClick={onClose}
                        className="cursor-pointer"
                    />
                </div>
                <div className="px-3">
                    <div className="dropdown-divider" />
                </div>
                <div>
                    {activities.map((activity) => (
                        <Activity {...activity} />
                    ))}
                </div>
            </div>
        );
    }
    return "";
}

export default Activities;
