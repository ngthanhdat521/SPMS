import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import styles from "./DropDownFolder.module.scss";

function DropDownFolder({ onDelete, onRename }) {
    return (
        <div className={styles["dropdown-folder"]}>
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
                        styles["dropdown-folder_menu"] + " dropdown-menu p-2"
                    }
                    aria-labelledby="dropdownMenuButton"
                >
                    <div
                        className={
                            styles["dropdown-folder_menu_icon"] +
                            " d-flex align-items-center p-1"
                        }
                        onClick={onRename}
                    >
                        <ModeEditOutlineOutlinedIcon />
                        <span className="ml-2">Rename</span>
                    </div>
                    <div className="dropdown-divider" />
                    <div
                        className={
                            styles["dropdown-folder_menu_icon"] +
                            " d-flex align-items-center p-1"
                        }
                        onClick={onDelete}
                    >
                        <DeleteOutlinedIcon />
                        <span className="ml-2">Delete</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownFolder;
