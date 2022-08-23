import React, { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import Comment from "../../../ui/Communication/Comment/Comment.component";
import styles from "./TaskDetail.module.scss";
import ListCheckbox from "../../../ui/Form/ListCheckbox/ListCheckbox.component";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import Textarea from "../../../ui/Form/Textarea/Textarea.component";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { Button } from "@mui/material";
import TimePicker from "../../../ui/Form/DateTimePicker/DateTimePicker.component";
import ProjectService from "../../../services/Supporter/Project/Project";
import { useSelector } from "react-redux";

function TaskDetail({
    closeTaskDetail,
    addComment,
    removeTask,
    taskName,
    taskDesc,
    startDate,
    endDate,
    members = [],
    comments = [],
    projectId,
}) {
    const [task, setTask] = useState({
        taskName: taskName,
        taskDesc: taskDesc,
        startDate: startDate,
        endDate: endDate,
        members: members,
        checkedMembers: members.map((member) => {
            return { ...member, isChecked: true };
        }),
    });
    const [content, setContent] = useState("");
    const [groupMembers, setGroupMembers] = useState([]);
    const user = useSelector(s => s.user);

    const filterGroup = () => {
        var result = groupMembers.map((groupMember) => {
            var isSame = members.some(
                (member) => member.userId === groupMember.userId
            );
            return {
                itemId: groupMember.userId,
                stuId: groupMember.stuId,
                firstName:groupMember.firstName,
                lastName: groupMember.lastName,
                fullName: groupMember.firstName + " " + groupMember.lastName,
                email: groupMember.email,
                isChecked: isSame,
            };
        });

        return result;
    };

    const handleText = (event, name) => {
        task[name] = event.target.value;
        setTask({ ...task });
    };

    const handleDateTime = (name, value) => {
        task[name] = value;
        setTask({ ...task });
    };

    const handleMember = (member, index, isChecked) => {
        let checkedMemberIndex = task.checkedMembers.findIndex(
            (checkedMember) => checkedMember.itemId === member.itemId
        );

        member.isChecked = isChecked;

        if (checkedMemberIndex >= 0)
            task.checkedMembers[0].isChecked = isChecked;
        else task.checkedMembers.push(member);

        if(isChecked)
        {
            let memberIndex = task.members.findIndex(
                (cmember) => cmember.itemId === member.itemId
            );
            console.log(member);
            if(memberIndex === -1) task.members.push(member);
        }
    };

    const onLoad = async () => {
        let { data, isSucess } = await ProjectService.loadProject(projectId);
        console.log(data);
        if (isSucess) setGroupMembers(data.member);
    };

    const saveTask = () => {
        closeTaskDetail(task);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["task-detail"]}>
            <div
                className={
                    styles["task-detail_header"] +
                    " d-flex justify-content-between default-bg align-items-center"
                }
            >
                <div className="d-flex justify-content-between align-items-center w-25">
                    <TodayOutlinedIcon />
                    <AccountCircleOutlinedIcon />
                    <OptionalDialog
                        title="Message"
                        content="Are you sure that you want to delete this task ?"
                        onAgree={removeTask}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </OptionalDialog>
                    <AttachmentOutlinedIcon />
                    <CheckBoxOutlinedIcon />
                </div>
                <div>
                    <CloseOutlinedIcon onClick={saveTask} />
                </div>
            </div>
            <div className={styles["task-detail_body"]}>
                <form>
                    <div className="form-group">
                        <label>Title</label>
                        <Textbox
                            onChange={(event) => handleText(event, "taskName")}
                            regex={/^[A-Za-z\d\s]{3,}$/}
                            defaultValue={task.taskName}
                            message="Title is minimum 3 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <Textarea
                            onChange={(event) => handleText(event, "taskDesc")}
                            regex={/^[A-Za-z\d\s]{3,}$/}
                            defaultValue={task.taskDesc}
                            message="Description is minimum 3 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Start</label>
                        <TimePicker
                            defaultValue={task.startDate}
                            onChange={(value) =>
                                handleDateTime("startDate", value)
                            }
                            isSubmitted={false}
                        />
                    </div>
                    <div className="form-group">
                        <label>Due</label>
                        <TimePicker
                            defaultValue={task.endDate}
                            onChange={(value) =>
                                handleDateTime("endDate", value)
                            }
                            isSubmitted={false}
                        />
                    </div>
                    <div className="form-group">
                        <label>Members</label>
                        <ListCheckbox
                            list={filterGroup()}
                            onChange={handleMember}
                        />
                    </div>
                </form>
                <div className="mt-5">
                    <div
                        className={
                            styles["task-detail_body_activity"] +
                            " d-flex align-items-center mb-3"
                        }
                    >
                        <InsertCommentOutlinedIcon />
                        <h5 className="mb-0 ml-2">Activity</h5>
                    </div>
                    <div className="d-flex">
                        <RoundedAvatar src="" name={`${user.firstName} ${user.lastName}`} />
                        <div className="w-100 ml-3">
                            <textarea
                                class="form-control mb-2"
                                rows="1"
                                defaultValue="Enter a comment"
                                onChange={(event) =>
                                    setContent(event.target.value)
                                }
                            ></textarea>
                            <Button
                                onClick={() => addComment(content)}
                                variant="contained"
                            >
                                Add Comment
                            </Button>
                        </div>
                    </div>
                    <div className="py-4">
                        <div>
                            {comments.map((comment, commentIndex) => (
                                <Comment
                                    key={commentIndex}
                                    fullname={
                                        comment.firstName +
                                        " " +
                                        comment.lastName
                                    }
                                    content={comment.content}
                                    createdAt={comment.createdAt}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
