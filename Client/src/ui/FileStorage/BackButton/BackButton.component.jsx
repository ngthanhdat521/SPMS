import React from "react";
import styles from "./BackButton.module.scss";

function BackButton() {
    return (
        <div className={styles["back-button"] + " d-flex"}>
            <div className="m-auto">
                <div
                    className={
                        styles["back-button_back-icon"] +
                        " fas fa-level-up-alt text-secondary"
                    }
                />
                <div className={styles["back-button_dot-icon"]}>..</div>
            </div>
        </div>
    );
}

export default BackButton;
