import React from "react";
import DateConverter from "../../../services/Converter/DateConverter";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import styles from "./Activity.module.scss";

function Activity({ firstName, lastName, actionName, createdOn }) {
    let fullName = `${firstName} ${lastName}`;

    return (
        <div className={`${styles["activity"]} d-flex align-items-center px-3`}>
            <RoundedAvatar name={fullName} />
            <div className="ml-3">
                <div>
                    <span className={`${styles["activity_name"]}`}>
                        {fullName}
                    </span>
                    <span className={`${styles["activity_action"]}`}>
                        {actionName}
                    </span>
                </div>
                <div className={`${styles["activity_time"]}`}>
                    {DateConverter.parseShortDateTime(createdOn)}
                </div>
            </div>
        </div>
    );
}

export default Activity;
