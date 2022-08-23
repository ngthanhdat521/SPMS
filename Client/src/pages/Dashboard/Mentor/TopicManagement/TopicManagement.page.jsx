import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import styles from "./TopicManagement.module.scss";
import ListCard from "../../../../ui/List/ListCard/ListCard.component";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import ToolbarBox from "../../../../ui/Container/ToolbarBox/ToolbarBox.component";
import TopicTab from "../../../../ui/Tab/TopicTab/TopicTab.component";
import { Button } from "@mui/material";
import TopicForm from "../../../../components/TopicManagement/TopicForm/TopicForm.component";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import Counter from "../../../../services/Array/Counter";
import ListTopic from "../../../../components/TopicManagement/ListTopic/ListTopic.component";
import TopicService from "../../../../services/Supporter/Topic/Topic";

function TopicManagement() {
    const [topics, setTopics] = useState([]);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState(0);

    const addTopic = async (topic) => {
        let newTopics = [...topics];
        newTopics.push(topic);
        let { message } = await TopicService.add(topic);

        setTopics(newTopics);
        setMessage(message);
    };

    const deleteTopic = async (projectId, index) => {
        let newTopics = [...topics];
        newTopics.splice(index, 1);
        setTopics(newTopics);
        
        let { message } = await TopicService.remove(projectId);
        setMessage(message);
    };

    const editTopic = async (topic, index) => {
        let newTopics = [...topics];
        newTopics[index] = topic;
        setTopics(newTopics);

        topic.projectId = topics[index].projectId;

        let { message } = await TopicService.edit(topic);
        setMessage(message);
        return true;
    };

    const closeMessage = () => {
        setMessage({
            isOpen: false,
            content: "",
        });
    };

    const onLoad = async () => {
        setIsLoading(true);
        let { isSucess, data } = await TopicService.load();
        if (isSucess) setTopics(data);
        setIsLoading(false);
    };

    useEffect(onLoad, []);

    return (
        <div>
            <Header>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Topic Management</h5>
                    <HeaderSearch placeholder="Search topics" />
                </div>
            </Header>
            <Body>
                <BasicSnackbar
                    onClose={closeMessage}
                    content={message.content}
                    isOpen={message.isOpen}
                />
                <BasicBox>
                    <ToolbarBox>
                        <div>
                            <h5>{topics.length} Topics</h5>
                            <span>
                                {`${Counter.countByValue(
                                    topics,
                                    "isChoosen",
                                    false
                                )} Waiting, ${Counter.countByValue(
                                    topics,
                                    "isChoosen",
                                    true
                                )} Choosen`}
                            </span>
                        </div>
                        <div className="d-flex justify-content-end py-2">
                            <TopicForm onSubmit={addTopic}>
                                <Button
                                    style={{ fontSize: "12px" }}
                                    className="mr-2 h-100 py-0 px-2"
                                    variant="contained"
                                >
                                    Add Topic
                                </Button>
                            </TopicForm>
                            <TopicTab
                                onChange={(event, newValue) => setTab(newValue)}
                            />
                        </div>
                    </ToolbarBox>
                    <ListCard>
                        <ListTopic
                            topics={topics}
                            tab={tab}
                            isLoading={isLoading}
                            onDelete={deleteTopic}
                            onEdit={editTopic}
                        />
                    </ListCard>
                </BasicBox>
            </Body>
        </div>
    );
}

export default TopicManagement;
