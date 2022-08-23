import React, { useState } from "react";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import { red, indigo } from "@mui/material/colors";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";
import styles from "./Council.module.scss";
import DateConverter from "../../../services/Converter/DateConverter";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CouncilModal from "../CouncilModal/CouncilModal.component";
import DefaultOptionalDialog from "../../../ui/DialogMessage/DefaultOptionalDialog/DefaultOptionalDialog.component";

function Council({ council, deleteCouncil }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editCouncil = () => {
        dispatch({
            type: "UPDATE_COUNCIL_FORM",
            payload: {
                council: council,
            },
        });
        navigate("/dashboard/council-form?type=edit");
    };
    const getLeft = () => {
        let total = council.students.length;
        if (total) return total * 22;
        else return 0;
    };
    const getZIndex = () => {
        return council.students.length;
    };

    const handleViewDetails = (event) => {
        if (event.target.tagName === "DIV") setIsOpenModal(!isOpenModal);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div>
            <CouncilModal
                isOpenModal={isOpenModal}
                council={council}
                handleCloseModal={handleCloseModal}
            />

            <DefaultOptionalDialog
                isVisible={isDeleting}
                title="Message"
                content="Do you want to delete this council ?"
                onAgree={() => {
                    setIsDeleting(false);
                    deleteCouncil();
                }}
                onDisagree={() => setIsDeleting(false)}
                onClose={() => setIsDeleting(false)}
            ></DefaultOptionalDialog>

            <div onClick={handleViewDetails} className={styles["council"]}>
                <div className={styles["council-header"]}>
                    <div className="d-flex justify-content-between">
                        <h4>{council.council.councilName}</h4>
                        <div className="d-flex">
                            <ModeEditOutlineOutlinedIcon
                                style={{ color: indigo[500] }}
                                className="mr-2 cursor-pointer"
                                onClick={editCouncil}
                            />
                            <DeleteOutlineOutlinedIcon
                                className="cursor-pointer"
                                style={{ color: red[500] }}
                                onClick={() => setIsDeleting(true)}
                            />
                        </div>
                    </div>
                    <p className={styles["council-desc"]}>
                        {council.council.councilDesc}
                    </p>
                </div>
                <div className={styles["council-body"]}>
                    <div className="d-flex">
                        {council.detailMembers.map((member, index) => (
                            <div
                                key={index}
                                style={{
                                    left: `${index * 22}px`,
                                    zIndex: index + 1,
                                }}
                                className={styles["council-body-avatar"]}
                            >
                                <RoundedAvatar
                                    key={index}
                                    name={`${member.firstName} ${member.lastName}`}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        fontSize: "11px",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles["council-footer"]}>
                    <span className={styles["item-location"]}>
                        {council.council.location}
                    </span>
                    <span className={styles["item-time"]}>
                        {DateConverter.parseShortDateTime(council.council.time)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Council;
