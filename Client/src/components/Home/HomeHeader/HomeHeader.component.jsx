import React from "react";
import styles from "./HomeHeader.module.scss";

// import homeImage from "./public/assets/images/teamwork.jpg";
const HomeHeader = () => {
  return (
    <div
      className={
        styles["home-header"] +
        " row justify-content-center " +
        styles["appearance"]
      }
    >
      <div className={styles["home-header_left"] + " col-xl-6 col-lg-12"}>
        <h1>Capstone Management</h1>
        <p>
          Project management is the study of planning, organizing and managing
          the monitoring of a project's development process to ensure that the
          project is completed on time, with quality assurance, and to achieve
          specific goals. of the project and its objectives.
        </p>
      </div>
      <div className={styles["home-header_right"] + " col-xl-4 col-lg-12"}>
        <img
          src="./assets/images/teamwork.png"
          alt=""
          className={styles["home-image"]}
        />
      </div>
    </div>
  );
};

export default HomeHeader;
