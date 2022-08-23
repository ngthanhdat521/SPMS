import React from "react";
import styles from "./Introduction.module.scss";
import { Button } from "@mui/material";

function Introduction() {
    return (
        <div className={styles["introduction"] + " w-100"}>
            <div className="h-100">
                <div className="">
                    <img className="w-100" src="/assets/images/test1.jpg" />
                </div>
                <div className="d-flex mt-5">
                    <div className="mx-auto">
                        <h5>Introduction</h5>
                        <h1 className="">Welcome to our website!</h1>
                        <p>
                            The dashboard will assist you with many features in the
                            system. All these features will help you a lot in
                            the management process. We always ensure that users
                            will have the best experience with the website.
                        </p>
                        <Button variant="contained">Learn More</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;
