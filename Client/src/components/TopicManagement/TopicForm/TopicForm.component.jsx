import React, { useState } from "react";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import Textarea from "../../../ui/Form/Textarea/Textarea.component";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ObjectChecker from "../../../services/Object/ObjectChecker";
import SnackbarContent from "@mui/material/SnackbarContent";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TopicForm.module.scss";

function TopicForm({
    projectName = "",
    projectDesc = "",
    files = [],
    text = "Add Topic",
    children,
    onSubmit,
}) {
    const [isInvisible, setIsInvisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmited, setIsSubmitted] = useState(false);
    const [topic, setTopic] = useState({
        projectName: projectName,
        projectDesc: projectDesc,
        files: files,
        deleteFileIds: [],
    });

    const handleChange = (event, name) => {
        let newTopic = { ...topic };
        newTopic[name] = event.target.value;
        setTopic(newTopic);
        setIsSubmitted(false);
    };

    const uploadFile = (event) => {
        let { files } = event.target;
        let newFiles = [...topic.files];

        for (let file of files) newFiles.push(file);

        let newTopic = { ...topic };

        newTopic.files = newFiles;

        setTopic(newTopic);
    };

    const closeFile = (index) => {
        let newTopic = { ...topic };

        console.log(newTopic.files[index]?.fileId);
        if(newTopic.files[index]?.fileId) newTopic.deleteFileIds.push(files[index].fileId);
        
        newTopic.files.splice(index, 1);
        setTopic(newTopic);
    };

    const closeForm = () => {
        setIsInvisible(true);
        setIsSubmitted(false);
    };

    const submit = async () => {
        let newTopic = { ...topic };
        delete newTopic.document;

        if (!ObjectChecker.isEmptyKey(newTopic)) {
            setIsLoading(true);
            topic.createdAt = new Date().toISOString();
            topic.isChoosen = false;

            await onSubmit(topic);
            setIsLoading(false);
            setIsSubmitted(true);
        }
    };

    return (
        <div className={styles["topic-form"]}>
            {isInvisible || (
                <div className="fixed-dark-bg d-flex">
                    <form className="m-auto">
                        <div
                            className={
                                styles["topic-form_close"] + " cursor-pointer"
                            }
                        >
                            <CloseOutlinedIcon onClick={closeForm} />
                        </div>
                        <h5 className="mb-3">Topic Form</h5>
                        <div className="form-group">
                            <label>Title</label>
                            <Textbox
                                defaultValue={topic.projectName}
                                regex={/^.{3,}$/}
                                onChange={(event) =>
                                    handleChange(event, "projectName")
                                }
                                isSubmitted={isSubmited}
                                message="Title include mininum 3 characters!"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <Textarea
                                defaultValue={topic.projectDesc}
                                regex={/^.{3,}$/}
                                onChange={(event) =>
                                    handleChange(event, "projectDesc")
                                }
                                isSubmitted={isSubmited}
                                message="Description include mininum 3 characters!"
                            />
                        </div>
                        {topic.files.map((file, index) => {
                            let name = file.name;
                            return (
                                <SnackbarContent
                                    key={index}
                                    action={
                                        <CloseIcon
                                            className="cursor-pointer"
                                            onClick={() => closeFile(index)}
                                        />
                                    }
                                    className="py-0 px-3 mb-3"
                                    message={name}
                                />
                            );
                        })}
                        <div className="custom-file mb-3">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                onChange={uploadFile}
                                multiple
                            />
                            <label
                                className="custom-file-label"
                                htmlFor="customFile"
                            >
                                Choose file
                            </label>
                        </div>

                        <LoadingButton
                            type="button"
                            onClick={submit}
                            loading={isLoading}
                            loadingPosition="start"
                            // loadingIndicator="Loading..."
                            variant="contained"
                            className="w-100"
                        >
                            {text}
                        </LoadingButton>
                    </form>
                </div>
            )}
            {React.cloneElement(children, {
                onClick: () => setIsInvisible(false),
            })}
        </div>
    );
}

export default TopicForm;
