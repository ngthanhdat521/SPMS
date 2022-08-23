import React from "react";
import DateConverter from "../../../services/Converter/DateConverter";
import styles from "./Notification.module.scss";

function Notification({ title, content, createdAt }) {

    const getContent = () => {
        const TEXT = "<p>&nbsp;</p>";
        let regex = new RegExp(TEXT, "g");
        return content.replace(regex, "");
    };
    
    return (
        <div className={styles["notification"]}>
            <div className={styles["notification_title"]}>
                <h5 className="mb-0">{title}</h5>
            </div>
            <div className={styles["notification_content"]}>
                <p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: getContent(),
                        }}
                    />
                </p>
            </div>
            <div className={styles["notification_time"]}>
                <span className="bold-light-text">
                    {DateConverter.parseShortDateTime(createdAt)}
                </span>
            </div>
        </div>
    );
}

export default Notification;
