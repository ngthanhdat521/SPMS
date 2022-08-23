import React from "react";
import Item3Parts from "../../../ui/Item/Item3Parts/Item3Parts.component";
import LoadingTopicContainer from "../../../ui/Loading/LoadingTopicContainer/LoadingTopicContainer.component";
import TopicContainer from "../TopicContainer/TopicContainer.component";

function ListTopic({ topics, tab, isLoading }) {
    if (isLoading) return <LoadingTopicContainer />;
    return topics.map((topic, index) => {
        if (tab === 0) {
            return (
                <Item3Parts key={index}>
                    <TopicContainer
                        topic={topic}
                    />
                </Item3Parts>
            );
        } else {
            if (topic.capstone === tab) {
                return (
                    <Item3Parts key={index}>
                        <TopicContainer
                            topic={topic}
                        />
                    </Item3Parts>
                );
            }
        }
    });
}

export default ListTopic;
