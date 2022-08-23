import React from "react";
import styles from "./RequiredValidation.module.scss";

function RequiredValidation({ text, message, isSubmitted }) {
  const check = () => {
    var isValid = !text && isSubmitted;
    if (isValid) return message;
    return "";
  };

  return (
    <div className={styles["required-validation"]}>
      <p className="error-text mt-2 mb-0">{check()}</p>
    </div>
  );
}

export default RequiredValidation;
