import React from "react";
import RoundedAvatar from "../../Avatar/RoundedAvatar/RoundedAvatar.component";
import DateConverter from "../../../services/Converter/DateConverter";
import styles from "./Notification.module.scss";

function Notification({ fullName, time, message, isAvatarVisible = true }) {
    return (
        <div className={styles["notification"] + " d-flex align-items-center"}>
            {isAvatarVisible ? (
                <div className="mr-3">
                    <RoundedAvatar src="" name={fullName} />
                </div>
            ) : (
                ""
            )}
            <div className="w-100">
                <div>
                    <span className={styles["notification_name"]}>
                        {fullName}
                    </span>
                    <span className={styles["notification_time"] + " ml-2"}>
                        {DateConverter.parseShortDateTime(time)}
                    </span>
                </div>
                <div className={styles["notification_action"]}>
                    <div dangerouslySetInnerHTML={{ __html: message }} />
                </div>
            </div>
        </div>
    );
}

export default Notification;
