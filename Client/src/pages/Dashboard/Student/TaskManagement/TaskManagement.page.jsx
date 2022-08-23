import React, { useEffect, useState } from "react";
import HeaderButton from "../../../../components/TaskManagement/HeaderButton/HeaderButton.component";
import ItemButton from "../../../../components/TaskManagement/ItemButton/ItemButton.component";
import ListTask from "../../../../components/TaskManagement/ListTask/ListTask.component";
import TaskDetail from "../../../../components/TaskManagement/TaskDetail/TaskDetail.component";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./TaskManagement.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ItemHeaderButton from "../../../../components/Stageboard/ItemHeaderButton/ItemHeaderButton.component";
import OptionalDialog from "../../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import Box from "@mui/material/Box";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LoadingTaskContainer from "../../../../ui/Loading/LoadingListTaskContainer/LoadingListTaskContainer.component";
import Activity from "../../../../components/TaskManagement/Activities/Activities.component";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import EvaluationBoard from "../../../../components/TaskManagement/EvaluationBoard/EvaluationBoard.component";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import StageService from "../../../../services/Supporter/Stage/Stage";
import ListTaskService from "../../../../services/Supporter/ListTask/ListTask";
import TaskService from "../../../../services/Supporter/Task/Task";
import { useSelector } from "react-redux";
import ProjectService from "../../../../services/Supporter/Project/Project";

function TaskManagement() {
    const [listsTask, setListsTask] = useState([]);
    const [isOpenedTaskDetail, setIsOpenedTaskDetail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const [message, setMessage] = useState({ isOpen: false, content: "" });
    const [task, setTask] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState({});
    const user = useSelector((s) => s.user);

    const openTaskDetail = (currentTask, clistIndex, ctaskIndex) => {
        setTask(currentTask);
        setIsOpenedTaskDetail(true);
        setCurrentIndex({
            listIndex: clistIndex,
            taskIndex: ctaskIndex,
        });
    };

    const closeTaskDetail = async (newTask) => {
        listsTask[currentIndex.listIndex].tasks[currentIndex.taskIndex] =
            newTask;
        newTask.taskId = task.taskId;
        setListsTask([...listsTask]);
        setIsOpenedTaskDetail(false);
        setTask({});
        let stageId = searchParams.get("stageId");
        let listTaskId = listsTask[currentIndex.listIndex].listTaskId;
        await TaskService.edit(stageId, listTaskId, newTask);
        //setMessage(message);
    };

    const addList = async (title) => {
        let stageId = searchParams.get("stageId");
        let { data, message } = await ListTaskService.add(stageId, { title });
        listsTask.push({
            listTaskId: data.listTaskId,
            title: title,
            tasks: [],
        });

        setListsTask([...listsTask]);
        setMessage(message);
    };

    const editList = async (listIndex, listTask) => {
        listsTask[listIndex].title = listTask.title;

        let { message } = await ListTaskService.edit(
            searchParams.get("stageId"),
            { listTaskId: listTask.listTaskId, title: listTask.title }
        );

        setListsTask([...listsTask]);
        setMessage(message);
    };

    const removeList = async (listTaskId, listIndex) => {
        listsTask.splice(listIndex, 1);
        setListsTask([...listsTask]);
        let { message } = await ListTaskService.remove(
            searchParams.get("stageId"),
            listTaskId
        );
        setMessage(message);
    };

    const addTask = async (title, listIndex) => {
        let stageId = searchParams.get("stageId");
        let listTaskId = listsTask[listIndex].listTaskId;
        let { data, isSucess } = await TaskService.add(stageId, listTaskId, {
            taskName: title,
            studentIds: [],
        });

        if (isSucess) {
            listsTask[listIndex].tasks.push({
                taskId: data.taskId,
                taskName: title,
                members: [],
            });
        }

        setListsTask([...listsTask]);
    };

    const removeTask = async () => {
        let stageId = searchParams.get("stageId");
        let listTaskId = listsTask[currentIndex.listIndex].listTaskId;
        let taskId =
            listsTask[currentIndex.listIndex].tasks[currentIndex.taskIndex]
                .taskId;

        await TaskService.remove(stageId, listTaskId, taskId);

        listsTask[currentIndex.listIndex].tasks.splice(
            currentIndex.taskIndex,
            1
        );

        setListsTask([...listsTask]);
        setIsOpenedTaskDetail(false);
        setTask({});
    };

    const moveTask = async (listIndex, taskIndex, newListIndex, taskId) => {
        if (listIndex !== newListIndex) {
            let stageId = searchParams.get("stageId");
            let newList = [...listsTask];
            newList[newListIndex].tasks.unshift(
                newList[listIndex].tasks[taskIndex]
            );
            newList[listIndex].tasks.splice(taskIndex, 1);

            setListsTask(newList);

            await TaskService.move(
                stageId,
                listsTask[listIndex].listTaskId,
                taskId,
                listsTask[newListIndex].listTaskId
            );
        }
    };

    const addComment = (content) => {
        let { listIndex, taskIndex } = currentIndex;
        if(!listsTask[listIndex].tasks[taskIndex]?.comments) listsTask[listIndex].tasks[taskIndex].comments = [];
        listsTask[listIndex].tasks[taskIndex].comments.push({
            ...user, content
        });
        setListsTask([...listsTask]);
    };

    const editStage = async (stage) => {
        stage.stageId = searchParams.get("stageId");
        stage.projectId = searchParams.get("projectId");
        let { message, isSucess } = await StageService.edit(stage);
        if (isSucess)
            setSearchParams({
                stageId: stage.stageId,
                stageName: stage.stageName,
                projectId: stage.projectId,
            });
        setMessage(message);
    };

    const deleteStage = async () => {
        let { message, isSucess } = await StageService.remove(
            searchParams.get("stageId"),
            searchParams.get("projectId")
        );

        if (isSucess) navigate("/dashboard/task-management");

        setMessage(message);
    };

    const openActivities = () => setIsActivitiesOpen(true);
    const closeActivities = () => setIsActivitiesOpen(false);
    const openBoard = () => setIsBoardOpen(true);
    const closeBoard = () => setIsBoardOpen(false);
    const closeMessage = () => setMessage({ isOpen: false, content: "" });

    const onLoad = async () => {
        let { data, isSucess } = await ListTaskService.loadListTask(
            searchParams.get("stageId")
        );
        let isMemberLeader = await ProjectService.isLeader(
            searchParams.get("projectId")
        );
        setIsLeader(isMemberLeader);
        if (isSucess) setListsTask(data);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["task-management"]}>
            <Header>
                <h5>{searchParams.get("stageName").replace("-", " ")}</h5>
                <div
                    className={
                        styles["task-management_tool"] +
                        " d-flex align-items-center"
                    }
                >
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        <Link to="/dashboard/task-management">
                            <HeaderButton
                                text="Boards"
                                Icon={() => <BarChartOutlinedIcon />}
                            />
                        </Link>
                        <div className="ml-3">
                            <div onClick={openActivities}>
                                <HeaderButton
                                    text="Activity"
                                    Icon={() => (
                                        <FormatListBulletedOutlinedIcon />
                                    )}
                                />
                            </div>
                        </div>
                        {isLeader && (
                            <div className="ml-3">
                                <div onClick={openBoard}>
                                    <HeaderButton
                                        text="Contribution"
                                        Icon={() => <PersonOutlinedIcon />}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mx-3">
                            <ItemHeaderButton
                                addItem={editStage}
                                CustomButton={() => (
                                    <HeaderButton
                                        text="Edit"
                                        Icon={() => <BorderColorOutlinedIcon />}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <OptionalDialog
                                title="Message"
                                content="Are you sure that you want to delete this stage ?"
                                onAgree={deleteStage}
                                onDisagree={() => {}}
                            >
                                <HeaderButton
                                    text="Delete"
                                    Icon={() => <DeleteOutlineOutlinedIcon />}
                                />
                            </OptionalDialog>
                        </div>
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                            >
                                <ListOutlinedIcon />
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-right p-2"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <Link to="/dashboard/task-management">
                                    <HeaderButton
                                        text="Boards"
                                        Icon={() => <BarChartOutlinedIcon />}
                                    />
                                </Link>
                                <div className="mt-2">
                                    <div onClick={openActivities}>
                                        <HeaderButton
                                            text="Activity"
                                            Icon={() => (
                                                <FormatListBulletedOutlinedIcon />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div onClick={openBoard}>
                                        <HeaderButton
                                            text="Contribution"
                                            Icon={() => <PersonOutlinedIcon />}
                                        />
                                    </div>
                                </div>
                                <div className="my-2">
                                    <ItemHeaderButton
                                        addItem={() => {}}
                                        CustomButton={() => (
                                            <HeaderButton
                                                text="Edit"
                                                Icon={() => (
                                                    <BorderColorOutlinedIcon />
                                                )}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="d-flex">
                                    <OptionalDialog
                                        title="Message"
                                        content="Are you sure that you want to delete this stage ?"
                                        onAgree={() => {}}
                                        onDisagree={() => {}}
                                    >
                                        <HeaderButton
                                            text="Delete"
                                            Icon={() => (
                                                <DeleteOutlineOutlinedIcon />
                                            )}
                                        />
                                    </OptionalDialog>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </Header>
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={closeMessage}
                />
                <div className={styles["task-management_list"] + " d-flex p-5"}>
                    <Activity
                        isOpen={isActivitiesOpen}
                        onClose={closeActivities}
                    />
                    <EvaluationBoard
                        isOpen={isBoardOpen}
                        onClose={closeBoard}
                        projectId={searchParams.get("projectId")}
                        stageId={searchParams.get("stageId")}
                        updateMessage={(message) => setMessage(message)}
                    />
                    {isLoading ? (
                        <LoadingTaskContainer />
                    ) : (
                        listsTask.map((list, listIndex) => (
                            <div className={"p-2"}>
                                <ListTask
                                    openTaskDetail={openTaskDetail}
                                    key={listIndex}
                                    listIndex={listIndex}
                                    addTask={addTask}
                                    removeList={removeList}
                                    moveTask={moveTask}
                                    editList={editList}
                                    {...list}
                                />
                            </div>
                        ))
                    )}
                    <div>
                        <ItemButton
                            addItem={addList}
                            text={"Add another list"}
                            style={{ width: "300px" }}
                        />
                    </div>
                    {isOpenedTaskDetail ? (
                        <div
                            className={
                                styles["task-management_task-detail"] +
                                " d-flex justify-content-center align-items-center"
                            }
                        >
                            <TaskDetail
                                {...task}
                                closeTaskDetail={closeTaskDetail}
                                addComment={addComment}
                                removeTask={removeTask}
                                projectId={searchParams.get("projectId")}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </Body>
        </div>
    );
}

export default TaskManagement;
