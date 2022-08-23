import React from "react";
import styles from "./BasicBox.module.scss";

function BasicBox({ children }) {
    return <div className={styles["basic-box"]}>{children}</div>;
}

export default BasicBox;
