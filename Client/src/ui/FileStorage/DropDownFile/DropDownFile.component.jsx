import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useSelector } from "react-redux";
import styles from "./DropDownFile.module.scss";

function DropDownFile({ onDownload, onDelete, onRename }) {
    const { roleUser } = useSelector((s) => s.user);

    return (
        <div className={styles["dropdown-file"]}>
            <div className="dropdown">
                <button
                    className="btn btn-secondary p-0"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                >
                    <ArrowDropDownOutlinedIcon />
                </button>
                <div
                    className={
                        styles["dropdown-file_menu"] + " dropdown-menu p-2"
                    }
                    aria-labelledby="dropdownMenuButton"
                >
                    {!roleUser.includes("mentor") || (
                        <>
                            <div
                                onClick={onRename}
                                className={
                                    styles["dropdown-file_menu_icon"] +
                                    " d-flex align-items-center p-1"
                                }
                            >
                                <ModeEditOutlineOutlinedIcon />
                                <span className="ml-2">Rename</span>
                            </div>
                            <div className="dropdown-divider" />
                            <div
                                onClick={onDelete}
                                className={
                                    styles["dropdown-file_menu_icon"] +
                                    " d-flex align-items-center p-1"
                                }
                            >
                                <DeleteOutlinedIcon />
                                <span className="ml-2">Delete</span>
                            </div>
                            <div className="dropdown-divider" />
                        </>
                    )}
                    <div
                        className={
                            styles["dropdown-file_menu_icon"] +
                            " d-flex align-items-center p-1"
                        }
                        onClick={onDownload}
                    >
                        <FileDownloadOutlinedIcon />
                        <span className="ml-2">Download</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownFile;
