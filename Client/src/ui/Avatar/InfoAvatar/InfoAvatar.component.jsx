import React from 'react';
import RoundedAvatar from '../RoundedAvatar/RoundedAvatar.component';
import styles from './InfoAvatar.module.scss';

function InfoAvatar({ fullName, email }) {
    return (
        <div className={styles["info-avatar"] + " d-flex align-items-center mb-2"}>
            <div className="mr-3">
                <RoundedAvatar src="" name={fullName} style={{ width: "35px", height: "35px", fontSize: "16px" }} />
            </div>
            <div>
                <div className={styles["info-avatar_name"]}>{fullName}</div>
                <div className={styles["info-avatar_email"] + " light-text"}>{email}</div>
            </div>
        </div>
    );
}

export default InfoAvatar;