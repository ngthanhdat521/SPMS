import React, { useEffect, useState } from "react";
import Textarea from "../../../ui/Form/Textarea/Textarea.component";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import Combobox from "../../../ui/Form/Combobox/Combobox.component";
import styles from "./TopicForm.module.scss";
import { Button } from "@mui/material";
import ObjectChecker from "../../../services/Object/ObjectChecker";
import BasicSnackbar from "../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import GroupService from "../../../services/Supporter/Group/Group";
import ProjectService from "../../../services/Supporter/Project/Project";

function TopicForm() {
    const [topic, setTopic] = useState({
        projectName: "",
        projectDesc: "",
        leaderId: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasTopic, setHasTopic] = useState(false);
    const [members, setMembers] = useState([]);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });

    const closeMessage = () => setMessage({ content: "", isOpen: false });

    const handleChange = (value, name) => {
        topic[name] = value;
        setTopic({ ...topic });
        setIsSubmitted(false);
    };

    const submit = async () => {
        if (!ObjectChecker.isEmptyKey(topic)) {
            let { message } = await ProjectService.submit(topic, hasTopic);

            setIsSubmitted(true);
            setMessage(message);
        }
    };

    const exportFile = async () => {
        await ProjectService.exportFile();
    };

    useEffect(async () => {
        let isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated) {
            let user = JSON.parse(localStorage.getItem("user"));

            let topicResponse = await ProjectService.getTopic(user.userId);
            if (topicResponse.isSucess && topicResponse.data) {
                let { projectId, projectName, projectDesc, note, leader } =
                    topicResponse.data;
                setHasTopic(true);
                setTopic({
                    projectId: projectId,
                    projectName: projectName,
                    projectDesc: projectDesc,
                    leaderId: leader.stuId,
                    note: note,
                });
            }

            let { data, isSucess } = await GroupService.loadByUserId(
                user.userId
            );

            data = data.map((d) => {
                d.fullName = `${d.firstName} ${d.lastName}`;
                return d;
            });

            if (isSucess) setMembers(data);
        }
    }, []);

    return (
        <div className={styles["topic-form"]}>
            <BasicSnackbar
                isOpen={message.isOpen}
                onClose={closeMessage}
                content={message.content}
            />
            <div className="d-flex w-100 h-100">
                <form className="p-3">
                    <h5 className="mb-3">Topic Form</h5>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="form-group">
                                <label>Title</label>
                                <Textbox
                                    onChange={(event) =>
                                        handleChange(
                                            event.target.value,
                                            "projectName"
                                        )
                                    }
                                    placeholder="Title"
                                    regex={/^[A-Za-z\d\s]{3,}$/}
                                    defaultValue={topic.projectName}
                                    message="Title is minimum 3 characters"
                                    isSubmitted={isSubmitted}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="form-group w-100">
                                <label>Leader</label>
                                <Combobox
                                    defaultValue={topic.leaderId}
                                    onChange={(event) => {
                                        handleChange(
                                            event.target.value,
                                            "leaderId"
                                        );
                                    }}
                                    message="Leader is required"
                                    list={members}
                                    shownName="fullName"
                                    gettedName="stuId"
                                    isSubmitted={isSubmitted}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <Textarea
                            onChange={(event) =>
                                handleChange(event.target.value, "projectDesc")
                            }
                            regex={/^.{3,}$/}
                            defaultValue={topic.projectDesc}
                            message="Description is minimum 3 characters"
                            isSubmitted={isSubmitted}
                        />
                    </div>

                    <div className="form-group">
                        <label>Note</label>
                        <Textarea
                            onChange={(event) =>
                                handleChange(event.target.value, "note")
                            }
                            regex={/^.{3,}$/}
                            defaultValue={topic.note}
                            message="Note is minimum 3 characters"
                            isSubmitted={isSubmitted}
                        />
                    </div>

                    <div className="form-group">
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={submit}
                                className="ml-2"
                                variant="contained"
                            >
                                Update Topic
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TopicForm;
