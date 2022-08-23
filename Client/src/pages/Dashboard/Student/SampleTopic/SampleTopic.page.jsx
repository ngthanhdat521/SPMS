import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import ListTopic from "../../../../components/SampleTopic/ListTopic/ListTopic.component";
import Counter from "../../../../services/Array/Counter";
import TopicService from "../../../../services/Supporter/Topic/Topic";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import ToolbarBox from "../../../../ui/Container/ToolbarBox/ToolbarBox.component";
import ListCard from "../../../../ui/List/ListCard/ListCard.component";
import TopicTab from "../../../../ui/Tab/TopicTab/TopicTab.component";
import styles from "./SampleTopic.module.scss";

function SampleTopic() {
    const [topics, setTopics] = useState([]);
    const [tab, setTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const onLoad = async () => {
        setIsLoading(true);
        let { data, isSucess } = await TopicService.load();
        if (isSucess) setTopics(data);
        setIsLoading(false);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["sample-topic"]}>
            <Header>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h5>Sample Topic</h5>
                    <input
                        type="text"
                        placeholder="Search topics"
                        className="form-control"
                    />
                </div>
            </Header>
            <Body>
                <BasicBox>
                    <ToolbarBox>
                        <div>
                            <h5>{topics.length} Topics</h5>
                        </div>
                        <div className={styles["sample-topic_tab"] + " mb-2"}>
                            {/* <TopicTab
                                onChange={(event, newValue) => setTab(newValue)}
                            /> */}
                        </div>
                    </ToolbarBox>
                    <ListCard>
                        <ListTopic
                            topics={topics}
                            isLoading={isLoading}
                            tab={tab}
                        />
                    </ListCard>
                </BasicBox>
            </Body>
        </div>
    );
}

export default SampleTopic;
