import React from "react";
import Item3Parts from "../../../ui/Item/Item3Parts/Item3Parts.component";
import LoadingTopicTemplateContainer from "../../../ui/Loading/LoadingTopicTemplateContainer/LoadingTopicContainer.component";
import TopicContainer from "../TopicContainer/TopicContainer.component";

function ListTopic({ topics, tab, isLoading, onEdit, onDelete }) {
    if (isLoading) return <LoadingTopicTemplateContainer />;
    return topics.map((topic, index) => {
        if (tab === 0) {
            return (
                <Item3Parts key={index}>
                    <TopicContainer
                        topic={topic}
                        onEdit={(edittedTopic) => onEdit(edittedTopic, index)}
                        onDelete={() => onDelete(topic.projectId, index)}
                    />
                </Item3Parts>
            );
        } else {
            if (topic.capstone === tab) {
                return (
                    <Item3Parts key={index}>
                        <TopicContainer
                            topic={topic}
                            onEdit={(edittedTopic) =>
                                onEdit(edittedTopic, index)
                            }
                            onDelete={() => onDelete(topic.projectId, index)}
                        />
                    </Item3Parts>
                );
            }
        }
    });
}

export default ListTopic;
