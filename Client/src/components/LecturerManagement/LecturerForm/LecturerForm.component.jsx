import { Button } from "@mui/material";
import React, { useState } from "react";
import FixedForm from "../../../ui/Form/FixedForm/FixedForm.component";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
// import styles from "./LecturerForm.module.scss";

function LecturerForm({ onSubmit, onClose }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const submit = () => {
        setIsSubmitted(true);
        onSubmit(email);
    };
    return (
        <FixedForm onClose={onClose}>
            <div className="form-group">
                <label>Email</label>
                <Textbox
                    defaultValue=""
                    regex={
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }
                    onChange={(event) => setEmail(event.target.value)}
                    isSubmitted={isSubmitted}
                    message="Email is invalid!"
                />
            </div>
            <Button
                className="w-100 px-1 pt-1"
                onClick={submit}
                variant="contained"
            >
                Add Lecturer
            </Button>
        </FixedForm>
    );
}

export default LecturerForm;
