import React, { useState } from "react";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";
import styles from "./ValidatedIconTextbox.module.scss";

const ValidatedIconTextbox = ({ isRequired, isSubmitted, placeholder, Icon, type, onChange, regex, regexMessage, requiredMessage }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleCheck = (event) => {
    let { value } = event.target;
    setText(value);
    let isValid = regex.exec(value);
    if (value) {
      if (!isValid) setError(regexMessage);
      else{
        setError("");
        onChange(event);
      }
    }
    else {
      if (isRequired) setError(requiredMessage);
    }
  }

  return (
    <div className={styles["validated-icon-textbox"]}>
      <div className={styles["validated-icon-textbox_input"]}>
        <span className={styles["icon-textbox_icon"]}>
          <Icon></Icon>
        </span>
        <input className="w-100" onChange={handleCheck} type={type} placeholder={placeholder} />
      </div>
      <RegexValidation message={error} />
      <RegexValidation message={isSubmitted && isRequired && !text ? requiredMessage : ""} />
    </div>
  );
};

export default ValidatedIconTextbox;
