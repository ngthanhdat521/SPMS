import React from "react";
import Topic from "../Topic/Topic.component";

function TopicContainer({ topic }) {
    return <Topic {...topic}></Topic>;
}

export default TopicContainer;
