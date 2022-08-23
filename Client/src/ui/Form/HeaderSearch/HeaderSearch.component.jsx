import React from "react";
import styles from "./HeaderSearch.module.scss";

function HeaderSearch({ placeholder, onChange }) {
    return (
        <div className={styles["header-search"]}>
            <input
                onChange={onChange}
                className={styles["header-search_textbox"] + " form-control"}
                placeholder={placeholder}
            />
        </div>
    );
}

export default HeaderSearch;
