import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import ListTopic from "../../../../components/TopicApproval/ListTopic/ListTopic.component";
import Counter from "../../../../services/Array/Counter";
import ProjectService from "../../../../services/Supporter/Project/Project";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import ToolbarBox from "../../../../ui/Container/ToolbarBox/ToolbarBox.component";
import TopicTab from "../../../../ui/Tab/TopicTab/TopicTab.component";
import styles from "./TopicApproval.module.scss";
function TopicApproval() {
    const [topics, setTopics] = useState([]);
    const [defaultTopics, setDefaultTopics] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const updateTopicByValue = (index, value) => {
        let newTopics = [...topics];
        newTopics[index].project.isApproved = value;
        setTopics(newTopics);
    };

    const handleTab = (event, newTab) => {
        if (newTab === 0) setTopics(defaultTopics);
        else {
            let newTopics = [...defaultTopics];
            newTopics = newTopics.filter(
                (topic) => topic.typeCapstone === newTab
            );
            setTopics(newTopics);
        }
    };

    const onLoad = async () => {
        setIsLoading(true);
        let { data, isSucess } = await ProjectService.loadAll();
        data = data.filter((group) => group.project);

        if (isSucess) {
            setDefaultTopics(data);
            setTopics(data);
        }

        setIsLoading(false);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["topic-approval"]}>
            <Header>
                <h5>Topic Approval</h5>
                <div>
                    <input
                        className="form-control"
                        placeholder="Search topics"
                    />
                </div>
            </Header>
            <Body>
                <BasicBox>
                    <ToolbarBox>
                        <div className="mb-2">
                            <h5>{topics.length} Topics</h5>
                            <div>
                                <span>
                                    {`${Counter.countByNameArr(
                                        topics,
                                        ["project", "isApproved"],
                                        "pending"
                                    )} Pending, ${Counter.countByNameArr(
                                        topics,
                                        ["project", "isApproved"],
                                        "approved"
                                    )} Approved, ${Counter.countByNameArr(
                                        topics,
                                        ["project", "isApproved"],
                                        "rejected"
                                    )} Rejected`}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div
                                className={
                                    styles["topic-approval_tab"] + " mb-2"
                                }
                            >
                                <TopicTab onChange={handleTab} />
                            </div>
                        </div>
                    </ToolbarBox>
                    <ListTopic
                        topics={topics}
                        isLoading={isLoading}
                        updateTopicByValue={updateTopicByValue}
                    />
                </BasicBox>
            </Body>
        </div>
    );
}

export default TopicApproval;
