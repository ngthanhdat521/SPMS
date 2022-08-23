import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import styles from "./Stage.module.scss";
import { Link } from 'react-router-dom';
import DateConverter from '../../../services/Converter/DateConverter';

const Stage = ({ stageId, stageName, projectId, stageDesc, updatedAt }) => {
    return (
        <Link to={`stage?&stageId=${stageId}&stageName=${stageName.replace(" ","-")}&projectId=${projectId}`}>
            <div className={styles["stage"]}>
                <div className="my-auto">
                    <div className={styles["stage_box"] + " light-bg mb-4"}>
                        <AssignmentOutlinedIcon className={styles["stage_icon"] + " default-text"} />
                    </div>
                    <h5>{stageName}</h5>
                    <p >{stageDesc}</p>
                    <div className={styles["stage_line"]}></div>
                    <div>
                        <span style={{ color: "#64748b" }}>Edited : </span>
                        <span>{DateConverter.calculate(updatedAt,new Date().toISOString())} days ago</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Stage;