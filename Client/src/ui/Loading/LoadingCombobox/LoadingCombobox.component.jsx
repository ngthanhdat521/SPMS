import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import styles from './LoadingCombobox.module.scss';
function LoadingCombobox() {
    return (
        <div className={styles["loading-combobox"]}>
            <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                className={styles["loading-item"]}
            />
        </div>
    );
}

export default LoadingCombobox;