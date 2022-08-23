import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styles from "./ItemButton.module.scss";
import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Combobox from "../../../ui/Form/Combobox/Combobox.component";
import ProjectService from "../../../services/Supporter/Project/Project";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import ObjectChecker from "../../../services/Object/ObjectChecker";

const ItemButton = ({ addItem }) => {
    const [isActive, setIsActive] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [item, setItem] = useState({
        projectId: "",
        stageName: "",
        stageDesc: "",
    });
    const [projects, setProjects] = useState([]);

    const onChange = (event, name) => {
        let { value } = event.target;
        setItem({ ...item, [name]: value });
        setIsSubmitted(false);
    };

    const add = async () => {
        if (!ObjectChecker.isEmptyKey(item)) {
            setIsActive(false);
            setItem({
                projectId: "",
                stageName: "",
                stageDesc: "",
            });
            await addItem(item);
        }
        setIsSubmitted(true);
    };

    const onLoad = async () => {
        let { data, isSucess } = await ProjectService.loadMyGroup();
        if (isSucess) {
            let newProjects = data.map((group) => {
                return group.project;
            });

            setProjects(newProjects);
        }
    };

    const closeForm = () => {
        setIsActive(false);
        setIsSubmitted(false);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["item-button"]}>
            {isActive ? (
                <form>
                    <div className="my-2">
                        <Textbox
                            onChange={(event) => onChange(event, "stageName")}
                            regex={/^.{2,}$/}
                            message="Title is minimum 2 characters !"
                            placeholder="Enter a title"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                    <div className="my-2">
                        <Textbox
                            onChange={(event) => onChange(event, "stageDesc")}
                            regex={/^.{2,}$/}
                            message="Description is minimum 2 characters !"
                            placeholder="Enter a description"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                    <div className="my-2">
                        <Combobox
                            onChange={(event) => onChange(event, "projectId")}
                            message="Choose a project to submit !"
                            list={projects}
                            shownName="projectName"
                            gettedName="projectId"
                            isSubmitted={isSubmitted}
                        />
                    </div>
                    <div className="d-flex align-items-center">
                        <Button onClick={add} variant="contained">
                            Add Item
                        </Button>
                        <CloseOutlinedIcon
                            onClick={closeForm}
                            className="ml-2"
                        />
                    </div>
                </form>
            ) : (
                <div
                    className={
                        styles["item-button_add"] + " d-flex align-items-center"
                    }
                    onClick={() => setIsActive(true)}
                >
                    <AddOutlinedIcon className="m-auto" />
                </div>
            )}
        </div>
    );
};

export default ItemButton;
