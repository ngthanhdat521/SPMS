import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import TopicTab from "../../../../ui/Tab/TopicTab/TopicTab.component";
import ToolbarBox from "../../../../ui/Container/ToolbarBox/ToolbarBox.component";
import styles from "./ListGroup.module.scss";
import List from "../../../../components/ListGroup/List/List.component";
import Group from "../../../../services/Supporter/Group/Group";

function ListGroup() {
    const [groups, setGroups] = useState([]);
    const [defaultGroups, setDefaultGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);

    const onLoad = async () => {
        let { data, isSucess } = await Group.load();

        data = data.filter((group) => group.students.length);


        if (isSucess) {
            setGroups(data);
            setDefaultGroups(data);
        }
        setIsLoading(false);
    };

    const handleTab = (e, value) => {
        if (value === 0) {
            setGroups(defaultGroups);
        } else {
            let newGroups = [...defaultGroups];
            newGroups = newGroups.filter(
                (group) => group.typeCapstone === value
            );
            setGroups(newGroups);
        }
        setTab(value);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["list-group"]}>
            <Header>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h5>List Group</h5>
                    <input
                        type="text"
                        className="form-control w-50 mr-2"
                        placeholder="Search groups"
                    />
                </div>
            </Header>
            <Body>
                <BasicBox>
                    <ToolbarBox>
                        <div className="mb-2">
                            <h5>{groups.length} Groups</h5>
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <div
                                className={
                                    styles["list-group_tab"] + " mb-2"
                                }
                            >
                                <TopicTab onChange={handleTab} />
                            </div>
                        </div>
                    </ToolbarBox>
                    <List groups={groups} isLoading={isLoading} />
                </BasicBox>
            </Body>
        </div>
    );
}

export default ListGroup;
