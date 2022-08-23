import React, { useEffect, useState } from "react";
import Notification from "../../../../components/ActivityNotification/Notification/Notification.component";
import Sidebar from "../../../../components/ActivityNotification/Sidebar/Sidebar.component";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import Pagination from "@mui/material/Pagination";
import styles from "./ActivityNotification.module.scss";
import NotificationDetail from "../../../../components/ActivityNotification/NotificationDetail/NotificationDetail.component";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationForm from "../../../../components/ActivityNotification/NotificationForm/NotificationForm.component";
import LoadingNotification from "../../../../ui/Loading/LoadingNotification/LoadingNotification.component";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import { axios } from "../../../../services/HttpClient/HttpClient";
import { useSelector } from "react-redux";

function ActivityNotification() {
    const [notifications, setNotifications] = useState([]);
    const [temp, setTemp] = useState({
        notifications: [],
    });
    const [message, setMessage] = useState({ content: "", isOpen: false });
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [currentNotification, setCurrentNotification] = useState({});
    const [notificationIndex, setNotificationIndex] = useState(-1);
    const { userId } = useSelector((s) => s.user);

    const openNotificationDetail = (notification, cNotificationIndex) => {
        setCurrentNotification(notification);
        setNotificationIndex(cNotificationIndex);
    };

    const addNotification = async (notification) => {
        notification.createdAt = new Date();

        let notificationForm = new FormData();
        notificationForm.append("title", notification.title);
        notificationForm.append("content", notification.content);
        notification.files.map((file, index) => {
            notification["file" + (index + 1)] = {
                ...file,
                fileName: file.name,
            };
            notificationForm.append("file" + (index + 1), file);
        });
        let newNotifications = [notification].concat(notifications);
        setNotifications(newNotifications);

        let { ok, status } = await axios({
            url: "/api/notification/add/" + userId,
            data: notificationForm,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (ok && status === 200)
            setMessage({
                content: "Add this notification sucessfully!",
                isOpen: true,
            });
        else
            setMessage({
                content: "Fail to add this notification!",
                isOpen: true,
            });
    };

    const updateNotification = async (notification) => {
        console.log("okl");
        notifications[notificationIndex] = { ...notification };

        let notificationForm = new FormData();
        notificationForm.append("title", notification.title);
        notificationForm.append("content", notification.content);
        notificationForm.append(
            "oldFiles",
            JSON.stringify(
                notification.oldFiles === undefined ? {} : notification.oldFiles
            )
        );
        let count = 1;
        for (let i = 1; i <= 4; i++) notification[`file${i}`] = null;

        notification.files =  notification.files.filter((file) => file);

        notification.files.map((file, index) => {
            notification["file" + (index + 1)] = {
                ...file,
                fileName: file.name === undefined ? file.fileName : file.name,
            };
            if (file && file.fileId === undefined) {
                notificationForm.append("file" + count, file);
                count++;
            }
        });

        setNotifications([...notifications]);
        setCurrentNotification({ ...notification });

        let { ok, status } = await axios({
            url: "/api/notification/update/" + notification.notificationId,
            data: notificationForm,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (ok && status === 200)
            setMessage({
                content: "Update this notification sucessfully!",
                isOpen: true,
            });
        else
            setMessage({
                content: "Fail to update this notification!",
                isOpen: true,
            });
    };

    const deleteNotification = async () => {
        let { ok, status } = await axios({
            url:
                "/api/notification/delete/" +
                notifications[notificationIndex].notificationId,
            method: "post",
        });

        if (ok && status === 200) {
            setMessage({
                content: "Delete this notification sucessfully!",
                isOpen: true,
            });

            notifications.splice(notificationIndex, 1);
            setNotifications([...notifications]);
            setNotificationIndex(-1);
            setCurrentNotification({});
        } else {
            setMessage({
                content: "Fail to delete this notification!",
                isOpen: true,
            });
        }
    };

    const loadNotifications = async () => {
        let { ok, status, data } = await axios({
            url: "/api/notification/list",
            method: "get",
        });

        temp.notifications = [...data];
        setTemp(temp);

        setTimeout(() => {
            if (ok && status === 200) setNotifications(data);
        }, 1000);
    };

    const searchNotification = (event) => {
        let { value } = event.target;
        let newNotifications = [];
        if (value) {
            newNotifications = notifications.filter(
                (notification) =>
                    notification.title
                        .toUpperCase()
                        .indexOf(value.toUpperCase()) >= 0
            );
        } else newNotifications = [...temp.notifications];

        setNotifications(newNotifications);
    };

    useEffect(async () => {
        await loadNotifications();
    }, []);

    return (
        <div
            className={
                styles["activity-notification"] + " activity-notification"
            }
        >
            <Header>
                <div className="w-100 d-flex justify-content-between">
                    <h5>Activity Notification</h5>
                    <div className="w-50">
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search notifications"
                            onChange={searchNotification}
                        />
                    </div>
                </div>
            </Header>
            <Body>
                <div
                    className={
                        styles["activity-notification_body"] +
                        " d-flex w-100 h-100 llight-top-border"
                    }
                >
                    <BasicSnackbar
                        onClose={() =>
                            setMessage({ content: "", isOpen: false })
                        }
                        content={message.content}
                        isOpen={message.isOpen}
                    />
                    {!isOpen || (
                        <NotificationForm
                            files={[]}
                            onClose={() => setIsOpen(false)}
                            onSubmit={updateNotification}
                            text="Update"
                            defaultNotification={{
                                ...currentNotification,
                                files: [
                                    currentNotification.file1,
                                    currentNotification.file2,
                                    currentNotification.file3,
                                    currentNotification.file4,
                                ],
                            }}
                        />
                    )}
                    <Sidebar addNotification={addNotification}>
                        {notifications.length
                            ? notifications.map(
                                  (notification, notificationIndex) => {
                                      let currentPage = page - 1;
                                      if (
                                          notificationIndex >=
                                              currentPage * 5 &&
                                          notificationIndex <
                                              currentPage * 5 + 5
                                      ) {
                                          return (
                                              <div
                                                  key={notificationIndex}
                                                  className="llight-bottom-border mb-2"
                                                  onClick={() =>
                                                      openNotificationDetail(
                                                          notification,
                                                          notificationIndex
                                                      )
                                                  }
                                              >
                                                  <Notification
                                                      key={notificationIndex}
                                                      {...notification}
                                                  />
                                              </div>
                                          );
                                      }
                                  }
                              )
                            : [1, 2, 3, 4, 5].map((v) => (
                                  <LoadingNotification key={v} />
                              ))}
                        <Pagination
                            onChange={(e, value) => setPage(value)}
                            page={page}
                            className="m-auto"
                            count={parseInt(notifications.length / 5) + 1}
                            color="primary"
                        />
                    </Sidebar>
                    {Object.keys(currentNotification).length ? (
                        <NotificationDetail
                            {...currentNotification}
                            files={[
                                currentNotification.file1,
                                currentNotification.file2,
                                currentNotification.file3,
                                currentNotification.file4,
                            ]}
                            onClose={() => setCurrentNotification({})}
                            onDelete={deleteNotification}
                            onUpdate={() => setIsOpen(true)}
                        />
                    ) : (
                        window.screen.width < 550 || (
                            <div className="d-flex w-75">
                                <div className="m-auto light-text">
                                    <div className="d-flex justify-content-center mb-3">
                                        <NotificationsActiveOutlinedIcon
                                            style={{ fontSize: "70px" }}
                                        />
                                    </div>
                                    <h5 className="mb-0">
                                        Choose a notification to read
                                    </h5>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </Body>
        </div>
    );
}

export default ActivityNotification;
