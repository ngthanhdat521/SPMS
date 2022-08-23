import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import ListCard from "../../../../ui/List/ListCard/ListCard.component";
import TopicTab from "../../../../ui/Tab/TopicTab/TopicTab.component";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import List from "../../../../components/GroupManagement/List/List.component";
import styles from "./GroupManagement.module.scss";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import GroupService from "../../../../services/Supporter/Group/Group";
import { NavLink } from "react-router-dom";
import ProjectService from "../../../../services/Supporter/Project/Project";

function GroupManagement() {
    const [groups, setGroups] = useState([]);
    const [defaultGroups, setDefaultGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });

    const deleteGroup = async (index) => {
        let newGroups = [...groups];
        newGroups.splice(index, 1);
        setGroups(newGroups);

        let { groupId } = groups[index];
        let { message } = await GroupService.remove(groupId);

        setMessage(message);
    };

    const closeMessage = () => {
        setMessage({ isOpen: false, content: "" });
    };

    const handleTab = (event, newTab) => {
        if (newTab === 0) setGroups(defaultGroups);
        else {
            let newGroups = [...defaultGroups];
            newGroups = newGroups.filter(
                (group) => group.typeCapstone === newTab
            );
            setGroups(newGroups);
        }
    };

    const exportFile = async () => {
        await ProjectService.exportFile();
    };

    const onLoad = async () => {
        let { data, isSucess } = await GroupService.load();
        data = data.filter((group) => group.students.length);
        if (isSucess) {
            console.log(data);
            data.sort((a,b) => a.name > b.name);
            setGroups(data);
            setDefaultGroups(data);
        }

        setIsLoading(false);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["group-management"]}>
            <Header>
                <h5>Group Management</h5>
                <HeaderSearch placeholder="Search groups" />
            </Header>
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    onClose={closeMessage}
                    content={message.content}
                />
                <BasicBox>
                    <div className="row mb-5">
                        <div className="col-xl-2 col-lg-12">
                            <h5>{groups.length} Groups</h5>
                        </div>
                        <div className="col-xl-10 col-lg-12">
                            <div className={styles["group-management_btn-box"]}>
                                <div className={`${styles["group-management_btn-box_event"]} d-flex mb-2 justify-content-center`}>
                                    <Button
                                        className="mr-2"
                                        variant="contained"
                                    >
                                        <NavLink to="/dashboard/group-form?type=add">
                                            Add Group
                                        </NavLink>
                                    </Button>
                                    <Button
                                        className="mr-2"
                                        variant="contained"
                                    >
                                        <NavLink to="/dashboard/assign-mentor">
                                            Assign Group
                                        </NavLink>
                                    </Button>
                                    <Button
                                        onClick={exportFile}
                                        variant="contained"
                                    >
                                        Export Project
                                    </Button>
                                </div>
                                <div className={`d-flex mb-2 justify-content-center`}>
                                    <TopicTab onChange={handleTab} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ListCard>
                        <List
                            groups={groups}
                            isLoading={isLoading}
                            deleteGroup={deleteGroup}
                        />
                    </ListCard>
                </BasicBox>
            </Body>
        </div>
    );
}

export default GroupManagement;
