import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";

function Textbox({
    regex = /^/,
    defaultValue = "",
    onChange,
    placeholder,
    message,
    isSubmitted,
    type = "text",
}) {
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
            <input
                type={type}
                defaultValue={defaultValue}
                className="form-control"
                onChange={handleCheck}
                placeholder={placeholder}
            />
            <RegexValidation message={error} />
            <RegexValidation message={!defaultValue && isSubmitted && !text ? "This field is required !" : ""} />
        </div>
    );
}

export default Textbox;
