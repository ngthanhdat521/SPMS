import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ColorSupporter from "../../../services/Color/ColorSupporter";
import styles from "./PieChart.module.scss";

function PieChart({ data = [] }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const getLabels = () => data.map((member) => `${member.firstName} ${member.lastName}`);

    const getDatasets = () => [
        {
            label: "# of Votes",
            data: data.map((member) => member.evaluate.percentage),
            backgroundColor: data.map((member) => ColorSupporter.toColorByName(`${member.firstName} ${member.lastName}`)),
            borderColor: data.map((member) => ColorSupporter.toColorByName(`${member.firstName} ${member.lastName}`)),
            borderWidth: 1,
        },
    ];

    const getData = () => {
        let labels = getLabels();
        let datasets = getDatasets();

        return {
            labels,
            datasets,
        };
    };

    return (
        <div className={styles["pie-chart"]}>
            <div className={styles["pie-chart_chart"]}>
                <Pie data={getData()} />
            </div>
        </div>
    );
}

export default PieChart;
