import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";

function Textarea({ regex, defaultValue, onChange, message, isSubmitted }) {
    const [error, setError] = useState("");
    const [text, setText] = useState("");

    const handleCheck = (event) => {
        onChange(event);
        const { value } = event.target;
        setText(value);
        var isValid = regex.exec(value);
        if (!isValid) setError(message);
        else setError("");
    };

    return (
        <div>
            <textarea
                className="form-control"
                rows="1"
                defaultValue={defaultValue}
                onChange={handleCheck}
            ></textarea>
            <RegexValidation message={error} />
            <RegexValidation message={!defaultValue && isSubmitted && !text ? message : ""} />
        </div>
    );
}

export default Textarea;
