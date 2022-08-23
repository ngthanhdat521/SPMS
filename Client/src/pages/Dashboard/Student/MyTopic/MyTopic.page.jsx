import React from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import TopicForm from "../../../../components/MyTopic/TopicForm/TopicForm.component";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";

import styles from "./MyTopic.module.scss";

function MyTopic() {
    return (
        <div className={styles["my-topic"]}>
            <Header>
                <h5>My Topic</h5>
            </Header>
            <Body>
               
                <BasicBox>
                    <TopicForm/>
                </BasicBox>
            </Body>
        </div>
    );
}

export default MyTopic;
