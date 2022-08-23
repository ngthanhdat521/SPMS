import React from "react";
import Topic from "../Topic/Topic.component";

function TopicContainer({ topic, onEdit, onDelete }) {
    return <Topic onEdit={onEdit} onDelete={onDelete} {...topic} />;
}

export default TopicContainer;
