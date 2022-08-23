import React from "react";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import WhiteBox from "../WhiteBox/WhiteBox.component";
import styles from "./TwoBox.module.scss";
function TwoBox({
  firstIsSearchFunction,
  firstOnSearch,
  children,
  secondIsSearchFunction,
  secondOnSearch,
}) {
  return (
    <div className={styles["two-box"]}>
      <div className={styles["first-box"]}>
        <WhiteBox
          isSearchFunction={firstIsSearchFunction}
          onSearch={(e) =>firstOnSearch(e)}
        >
          {children[0]}
        </WhiteBox>
      </div>
      <div className={styles["transfer-icon"]}>
        {children[1]}
      </div>
      <div className={styles["second-box"]}>
        <WhiteBox
          isSearchFunction={secondIsSearchFunction}
          onSearch={secondOnSearch}
        >
          {children[2]}
        </WhiteBox>
      </div>
    </div>
  );
}

export default TwoBox;
