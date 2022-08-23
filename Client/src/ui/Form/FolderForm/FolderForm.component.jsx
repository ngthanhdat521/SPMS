import { Button } from "@mui/material";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./FolderForm.module.scss";
import FixedForm from "../FixedForm/FixedForm.component";

function FolderForm({ onSubmit, children }) {
    const [isInvisible, setInvisible] = useState(true);
    const [folderName, setFolderName] = useState("");

    const handleChange = (event) => {
        let { value } = event.target;
        if (value) setFolderName(value);
    };

    return (
        <div className={styles["folder-form"]}>
            {isInvisible || (
                <FixedForm onClose={() => setInvisible(true)}>
                    <h5 className="mb-3">New folder</h5>
                    <div className="form-group">
                        <input
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => onSubmit(folderName)}
                        >
                            Create
                        </Button>
                    </div>
                </FixedForm>
            )}
            {React.cloneElement(children, {
                onClick: () => setInvisible(false),
            })}
        </div>
    );
}

export default FolderForm;
