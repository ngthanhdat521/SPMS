import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import Group from "../../../../components/MyGroup/Group/Group.component";
import ProjectService from "../../../../services/Supporter/Project/Project";
import styles from "./MyGroup.module.scss";

function MyGroup() {
    const [groups, setGroups] = useState([]);

    const onLoad = async () => {
        let { data, isSucess } = await ProjectService.loadMyGroup();
        console.log(data);
        if (isSucess) setGroups(data);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["my-group"]}>
            <Header>
                <h5>My Group</h5>
            </Header>
            <Body>
                <div className={styles["my-group_item"] + " d-flex p-5"}>
                    {groups.map((group) => <Group {...group} />)}
                </div>
            </Body>
        </div>
    );
}

export default MyGroup;
