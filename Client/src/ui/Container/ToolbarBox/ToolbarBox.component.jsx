import React from "react";
import styles from "./ToolbarBox.module.scss";

function ToolbarBox({ children }) {
    return (
        <div className={styles["toolbar-box"]}>
            <div className="mb-3">
                <div className="row">
                    <div className="col-xl-6 col-sm-6 col-md-4 col-12">
                        {children[0]}
                    </div>
                    <div className="col-xl-6 col-sm-6 col-md-8 col-12">
                        <div className={styles["toolbar-box_right"]}>
                            {children[1]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToolbarBox;
