import React from "react";
import styles from "./Item3Parts.module.scss";

function Item3Parts({ children }) {
    return <div className={styles["item-3parts"]}>{children}</div>;
}

export default Item3Parts;
