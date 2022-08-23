import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";

function Numberbox({
    defaultValue,
    onChange,
    placeholder,
    message,
    isSubmitted,
    min,
    max,
}) {
    const [error, setError] = useState("");
    const [text, setText] = useState("");

    const handleCheck = (event) => {
        onChange(event);
        const { value } = event.target;
        setText(value);
        if (value < min || value > max) setError(message);
        else setError("");
    };

    return (
        <div>
            <input
                type="number"
                defaultValue={defaultValue}
                className="form-control"
                onChange={handleCheck}
                placeholder={placeholder}
            />
            <RegexValidation message={error} />
            <RegexValidation message={!defaultValue && isSubmitted && !text ? message : ""} />
        </div>
    );
}

export default Numberbox;
