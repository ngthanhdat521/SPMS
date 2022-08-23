import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";
import styles from "./ErrorNumberBox.module.scss";

function ErrorNumberbox({
    onChange,
    min = 0,
    max = 1000000,
}) {
    const [isError, setIsError] = useState(false);

    const handleCheck = (event) => {
        const { value } = event.target;
        let newEvent = {...event};
        newEvent.isError = false;
        if (value < min || value > max) {
            setIsError(true);
            newEvent.isError = true;
        }
        else setIsError(false);
        onChange(newEvent);
    };

    return (
        <div className={styles["error-number-box"]}>
            <input
                type="number"
                className={`form-control p-0 ${isError && styles["error-number-box_error-border"]}`}
                onChange={handleCheck}
            />
            {/* <RegexValidation message={error} />
            <RegexValidation message={!defaultValue && isSubmitted && !text ? message : ""} /> */}
        </div>
    );
}

export default ErrorNumberbox;
