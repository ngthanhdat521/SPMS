import React from "react";
import styles from "./WhiteBox.module.scss";
import TextField from "@mui/material/TextField";

function WhiteBox({ children, isSearchFunction, onSearch }) {
  return (
    <div className={styles["white-box-container"]} styles={styles}>
      <div className={styles["search-bar-container"]}>
        {isSearchFunction ? (
          <TextField
            id="standard-search"
            variant="standard"
            label="Search field"
            name="password"
            autoComplete="off"
            type="text"
            className={styles["search-bar"]}
            placeholder={"Student name"}
            onChange={(e) => onSearch(e)}
          />
        ) : (
          ""
        )}
      </div>
      {React.cloneElement(children, { className: styles["white-box"] })}
    </div>
  );
}

export default WhiteBox;