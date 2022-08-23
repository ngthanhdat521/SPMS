import { useState } from "react";
import styles from "./Group.module.scss";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DateConverter from "../../../services/Converter/DateConverter";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button } from "@mui/material";
import { red, indigo } from "@mui/material/colors";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DefaultOptionalDialog from "../../../ui/DialogMessage/DefaultOptionalDialog/DefaultOptionalDialog.component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupModal from "../GroupModal/GroupModal.component";

function Group({
    groupId,
    note,
    name,
    startDate,
    endDate,
    typeCapstone,
    isScientificGroup,
    students,
    mentors,
    onDelete,
}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editGroup = () => {
        let members = [];
        students.map((student) => {
            members.push({ ...student.userInfo, ...student.studentInfo });
        });

        dispatch({
            type: "UPDATE_GROUP_FORM",
            payload: {
                groupId: groupId,
                groupName: name,
                isScientificGroup: isScientificGroup,
                groupDesc: note,
                students: members,
            },
        });

        navigate("/dashboard/group-form?type=edit");
    };

    const getLeft = () => {
        let total = students.length + mentors.length;
        if (total) return total * 22;
        else return 0;
    };

    const getZIndex = () => {
        return students.length + mentors.length;
    };

    const handleViewDetails = (event) => {
        if (event.target.tagName === "DIV")
            setIsOpenModal(!isOpenModal);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div style={{ position: "relative" }}>
            <GroupModal
                isOpenModal={isOpenModal}
                handleCloseModal={handleCloseModal}
                note={note}
                name={name}
                startDate={startDate}
                endDate={endDate}
                typeCapstone={typeCapstone}
                isScientificGroup={isScientificGroup}
                students={students}
                mentors={mentors}
            />
            <DefaultOptionalDialog
                isVisible={isDeleting}
                title="Message"
                content="Do you want to delete this group ?"
                onAgree={() => {
                    setIsDeleting(false);
                    onDelete();
                }}
                onDisagree={() => setIsDeleting(false)}
                onClose={() => setIsDeleting(false)}
            ></DefaultOptionalDialog>
            <div onClick={handleViewDetails} className={styles["group"]}>
                <div className={styles["group_header"]}>
                    <div className="d-flex justify-content-between">
                        <h4>{name}</h4>
                        <div className="d-flex">
                            <ModeEditOutlineOutlinedIcon
                                onClick={editGroup}
                                style={{ color: indigo[500] }}
                                className="mr-2 cursor-pointer"
                            />
                            <DeleteOutlineOutlinedIcon
                                className="cursor-pointer"
                                style={{ color: red[500] }}
                                onClick={() => setIsDeleting(true)}
                            />
                        </div>
                    </div>
                    <p className="mb-1">{`Capstone ${typeCapstone} (${
                        isScientificGroup ? "Scientific Research" : "Normal"
                    })`}</p>
                    <span className="light-text">{note}</span>
                </div>
                <div className="dropdown-divider pt-2" />
                <div className={styles["group_body"]}>
                    <div className="d-flex">
                        {students.map((student, index) => (
                            <div
                                style={{
                                    left: `${index * 22}px`,
                                    zIndex: index + 1,
                                }}
                                className={styles["group_body_avatar"]}
                            >
                                <RoundedAvatar
                                    key={index}
                                    name={`${student.userInfo.firstName} ${student.userInfo.lastName}`}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        fontSize: "11px",
                                    }}
                                />
                            </div>
                        ))}
                        {mentors.map((student, index) => (
                            <div
                                style={{
                                    left: `${(students.length + index) * 22}px`,
                                    zIndex: students.length + index + 1,
                                }}
                                className={styles["group_body_avatar"]}
                            >
                                <RoundedAvatar
                                    key={index}
                                    name={`${student.firstName} ${student.lastName}`}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        fontSize: "11px",
                                    }}
                                />
                            </div>
                        ))}
                        <div
                            style={{
                                left: `${getLeft()}px`,
                                zIndex: getZIndex(),
                            }}
                            onClick={editGroup}
                            className={styles["group_body_avatar"]}
                        >
                            <Button
                                className={styles["group_body_avatar_button"]}
                                variant="contained"
                            >
                                <AddOutlinedIcon />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="dropdown-divider py-2" />
                <div className={styles["group_footer"] + ""}>
                    <div className="">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="w-75 d-flex align-items-center">
                                    <ManageAccountsOutlinedIcon className="light-text" />{" "}
                                    <span className="ml-2 light-text">
                                        {mentors.length} mentors
                                    </span>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="d-flex align-items-center">
                                    <GroupOutlinedIcon className="light-text" />{" "}
                                    <span className="ml-2 light-text">
                                        {students.length} members
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Group;
