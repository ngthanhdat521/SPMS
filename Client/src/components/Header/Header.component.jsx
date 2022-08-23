import React from 'react';
import styles from "./Header.module.scss";

function Header({ children }) {
    return (
        <div
            className={
                styles["header"] +
                " d-flex justify-content-between align-items-center llight-bottom-border dashboard_header"
            }
        >
            {children}
        </div>
    );
}

export default Header;