import React, { useState } from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import InfoAvatar from "../../Avatar/InfoAvatar/InfoAvatar.component";
import styles from "./CheckMember.module.scss";

function ElementChecker({ onChange, fullName, email, defaultValue = false }) {
    const [isChecked, setIsChecked] = useState(defaultValue);

    const handleChange = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    };

    return (
        <div
            onClick={handleChange}
            style={{ borderRadius: "10px" }}
            className={
                (isChecked ? "light-bg " : "") +
                styles["check-member"]+
                " d-flex mb-2 px-2 pt-2 cursur-pointer"
            }
        >
            <InfoAvatar fullName={fullName} email={email} />
            {!isChecked || (
                <CheckOutlinedIcon
                    sx={{ fontSize: "20px" }}
                    className="ml-auto light-text"
                />
            )}
        </div>
    );
}

export default ElementChecker;
