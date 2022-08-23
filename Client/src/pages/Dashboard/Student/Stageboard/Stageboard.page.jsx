import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import ItemButton from "../../../../components/Stageboard/ItemButton/ItemButton.component";
import Stage from "../../../../components/Stageboard/Stage/Stage.component";
import LoadingStageContainer from "../../../../ui/Loading/LoadingStageContainer/LoadingStageContainer";
import StageService from "../../../../services/Supporter/Stage/Stage";
import styles from "./Stageboard.module.scss";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";

function Taskboard() {
    const [stages, setStages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });

    const addStage = async (stage) => {
        let { data, message, isSucess } = await StageService.add(stage);
        stage.stageId = data.stageId;
        if (isSucess) stages.push(stage);

        setStages([...stages]);
        setMessage(message);
    };

    const closeMessage = () => {
        setMessage({ isOpen: false, content: "" });
    };

    const onLoad = async () => {
        setIsLoading(true);
        let { data, isSucess } = await StageService.load();
        data.sort((a,b) => a.stageName > b.stageName ? 1 : -1);
        
        if (isSucess) setStages(data);

        setIsLoading(false);
    };

    useEffect(onLoad, []);

    return (
        <div
            className={
                styles["stage-board"] + " w-100 d-flex align-items-center"
            }
        >
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={closeMessage}
                />
                <div className="w-100 h-100 p-3">
                    <h1 className="text-center mb-5">Stageboard</h1>
                    <div
                        className={
                            styles["stage-board_list-stage"] +
                            " d-flex justify-content-center p-3"
                        }
                    >
                        {isLoading ? (
                            <LoadingStageContainer />
                        ) : (
                            stages.map((stage, stageIndex) => (
                                <div
                                    className={
                                        styles["stage-board_stage"] + " p-2"
                                    }
                                >
                                    <Stage key={stageIndex} {...stage} />
                                </div>
                            ))
                        )}
                        <div className={styles["stage-board_stage"] + " p-2"}>
                            <ItemButton addItem={addStage} />
                        </div>
                    </div>
                </div>
            </Body>
        </div>
    );
}

export default Taskboard;
