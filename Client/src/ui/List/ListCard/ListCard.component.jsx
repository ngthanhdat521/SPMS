import React from "react";
import styles from "./ListCard.module.scss";

function ListCard({ children }) {
    return <div className={styles["list-card"]}>{children}</div>;
}

export default ListCard;
