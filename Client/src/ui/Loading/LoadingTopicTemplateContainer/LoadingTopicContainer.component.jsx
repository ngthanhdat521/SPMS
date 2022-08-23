import React from "react";
import Item3Parts from "../../Item/Item3Parts/Item3Parts.component";
import LoadingTopicTemplate from "../LoadingTopicTemplate/LoadingTopicTemplate.component";

function LoadingTopicTemplateContainer({}) {
    return Array(6)
        .fill(0)
        .map((n, index) => (
            <Item3Parts key={index}>
                <LoadingTopicTemplate />
            </Item3Parts>
        ));
}

export default LoadingTopicTemplateContainer;
