import React from 'react';
import DateConverter from '../../../services/Converter/DateConverter';
import RoundedAvatar from '../../Avatar/RoundedAvatar/RoundedAvatar.component';
import styles from "./Comment.module.scss";

function Comment({ fullname, content, createdAt }) {
    return (
        <div className={styles["comment"] + " d-flex"}>
            <RoundedAvatar src="" name={fullname} style={{ width: "30px", height: "30px",fontSize:"16px" }} />
            <div className={styles["comment_right"] + " ml-3"}>
                <div className="d-flex align-items-end">
                    <h5 className="mb-0 mr-2">{fullname}</h5>
                    <span className="light-text">{DateConverter.parseShortDateTime(createdAt)}</span>
                </div>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default Comment;