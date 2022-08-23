import React from "react";
import { red, deepOrange } from "@mui/material/colors";
import styles from "./Error404.module.scss";
import { NavLink } from "react-router-dom";

function Error404() {
    return (
        <div className={styles["error-404"]}>
            <div className={styles["error-404_box"] + " m-auto"}>
                <div className="notfound-404">
                    <h1 style={{ color: red[700] }}>404</h1>
                </div>
                <h2>Oops, Nothing was not found!</h2>
                <p>
                    The page you are looking for might have been removed had its
                    name changed or is temporarily unavailable.{" "}
                    <NavLink style={{ color: deepOrange[700] }} to="/home">
                        Return to Home page
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default Error404;
