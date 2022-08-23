import React from 'react';
import styles from "./HeaderButton.module.scss";

function HeaderButton({text,Icon}) {
    return (
        <div className={styles["header-button"] + " light-border d-flex align-items-center cursor-pointer"}>
            <Icon />
            <span className="ml-2">{text}</span>
        </div>
    );
}

export default HeaderButton;