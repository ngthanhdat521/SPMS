import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./FixedForm.module.scss";

function FixedForm({ children, onClose }) {
    return (
        <div className={styles["fixed-form"]}>
            <div className="fixed-dark-bg d-flex">
                <form className="m-auto">
                    <CloseOutlinedIcon className={styles["fixed-form_close"]} onClick={onClose} />
                    {children}
                </form>
            </div>
        </div>
    );
}

export default FixedForm;
