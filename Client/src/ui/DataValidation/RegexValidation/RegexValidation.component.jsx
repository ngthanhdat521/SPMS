import React from "react";
import styles from "./RegexValidation.module.scss";

function RegexValidation({ message }) {
  return (
    <div className={styles["regex-validation"]}>
      <p className="error-text mt-2 mb-0">{message}</p>
    </div>
  );
}

export default RegexValidation;
