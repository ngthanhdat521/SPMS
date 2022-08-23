import React from "react";
import BarChart from "../BarChart/BarChart.component";
import PieChart from "../PieChart/PieChart.component";
import styles from "./StageReport.module.scss";

function StageReport({ stageName, evaluates }) {
    return (
        <div className={styles["stage-report"]}>
            <div className={styles["stage-report_container"]}>
                <h3>{stageName}</h3>
                <div className={styles["stage-report_charts"]}>
                    <PieChart data={evaluates} />
                    <div className={styles["stage-report_info"]}>
                        {evaluates.map((evaluate) => (
                            <div className="p-4">
                                <p className="m-0">
                                    {evaluate.firstName} {evaluate.lastName}
                                </p>
                                <div>
                                    <span>
                                        - Percentage : {evaluate.evaluate.percentage}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        - Comment : {evaluate.evaluate.comment}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StageReport;
