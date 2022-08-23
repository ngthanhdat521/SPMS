import React from "react";
import Item3Parts from "../../Item/Item3Parts/Item3Parts.component";
import LoadingTopic from "../LoadingTopic/LoadingTopic.component";

function LoadingTopicContainer({}) {
    return Array(6)
        .fill(0)
        .map((n, index) => (
            <Item3Parts key={index}>
                <LoadingTopic />
            </Item3Parts>
        ));
}

export default LoadingTopicContainer;
