import React, { useEffect, useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import styles from "./TransparentTextbox.module.scss";

function TransparentTextbox({
    regex,
    defaultValue,
    onChange = (event) => {},
    placeholder,
    message,
    type = "text",
    onSave,
    isTextboxVisible = true,
    className = "",
}) {
    const [error, setError] = useState("");
    const [text, setText] = useState("");
    const [isVisible, setIsVisible] = useState(isTextboxVisible);

    const handleCheck = (event) => {
        onChange(event);
        setText(event.target.value);
    };

    const openForm = () => setIsVisible(false);

    const saveForm = () => {
        setIsVisible(true);
        onSave(text);
    };

    useEffect(() => {
        setIsVisible(isTextboxVisible);
    },[isTextboxVisible])

    return (
        <div className={`${styles["transparent-textbox"]} ${className}`}>
            {isVisible ? (
                <span onClick={openForm}>{defaultValue}</span>
            ) : (
                <div>
                    <input
                        type={type}
                        defaultValue={defaultValue}
                        className="form-control"
                        onChange={handleCheck}
                        placeholder={placeholder}
                    />
                    <SaveOutlinedIcon onClick={saveForm} />
                </div>
            )}
        </div>
    );
}

export default TransparentTextbox;
