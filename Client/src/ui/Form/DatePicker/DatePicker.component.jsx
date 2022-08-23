import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";

function DatePicker({ defaultValue, onChange, message, isSubmitted }) {
    const [text, setText] = useState("");

    const handleCheck = (event) => {
        onChange(event);
        const { value } = event.target;
        setText(value);
    };

    return (
        <div>
            <input
                type="date"
                defaultValue={defaultValue}
                className="form-control"
                onChange={handleCheck}
            />
            <RegexValidation message={isSubmitted && !text ? message : ""} />
        </div>
    );
}

export default DatePicker;
