import React from "react";
import styles from "./IconCombobox.module.scss";

const IconCombobox = ({ Icon, defaultValues, list }) => {
  return (
    <div className={styles["icon-combobox"]}>
      <span className={styles["icon-combobox_icon"]}>
        <Icon></Icon>
      </span>
      <select className="form-select">
        <option selected>Open this select menu</option>
        {list.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default IconCombobox;
