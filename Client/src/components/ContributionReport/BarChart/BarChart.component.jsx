import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import styles from './BarChart.module.scss';

function BarChart({ data = [] }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Task Report",
            },
        },
    };

    const getLabels = () => data.map((member) => `${member.firstName} ${member.lastName}`)

    const getDatasets = () => [
        {
            label: "Contribution Percent",
            data: data.map((member) => member.contribution),
            backgroundColor: "#5873fe",
        },
    ]

    const getData = () => {
        let labels = getLabels();
        let datasets = getDatasets();

        return {
            labels,
            datasets,
        };
    };

    return (
        <div className="">
            <Bar options={options} data={getData()} />
        </div>
    );
}

export default BarChart;
