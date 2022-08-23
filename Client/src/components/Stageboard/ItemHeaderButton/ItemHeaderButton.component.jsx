import React, { useEffect, useState } from "react";
import styles from "./ItemHeaderButton.module.scss";
import { Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Combobox from "../../../ui/Form/Combobox/Combobox.component";
import ProjectService from "../../../services/Supporter/Project/Project";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import ObjectChecker from "../../../services/Object/ObjectChecker";
import { useParams } from "react-router-dom";

const ItemHeaderButton = ({ addItem, CustomButton }) => {
    const [isActive, setIsActive] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [item, setItem] = useState({
        stageName: "",
        stageDesc: "",
    });

    const onChange = (event, name) => {
        let { value } = event.target;
        setItem({ ...item, [name]: value });
        setIsSubmitted(false);
    };

    const add = async () => {
        if (!ObjectChecker.isEmptyKey(item)) {
            setIsActive(false);
            setItem({
                stageName: "",
                stageDesc: "",
            });
            await addItem(item);
        }
        setIsSubmitted(true);
    };

    const closeForm = () => {
        setIsActive(false);
        setIsSubmitted(false);
    };

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
                ""
            )}
            <div onClick={() => setIsActive(true)}>
                <CustomButton />
            </div>
        </div>
    );
};

export default ItemHeaderButton;
