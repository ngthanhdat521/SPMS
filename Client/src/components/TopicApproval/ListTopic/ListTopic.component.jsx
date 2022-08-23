import React, { useState } from "react";
import Item3Parts from "../../../ui/Item/Item3Parts/Item3Parts.component";
import LoadingTopicContainer from "../../../ui/Loading/LoadingTopicContainer/LoadingTopicContainer.component";
import TopicContainer from "../TopicContainer/TopicContainer.component";
import Pagination from "@mui/material/Pagination";
import ListCard from "../../../ui/List/ListCard/ListCard.component";

function ListTopic({ topics, isLoading, updateTopicByValue }) {
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getPage = (index) => {
        return index >= page * 9 - 9 && index < page * 9;
    };

    const getPages = () => {
        if (topics.length <= 9) return 1;
        let amount = (topics.length / 9) % 1;
        return Math.round(
            amount === 0 ? topics.length / 9 : topics.length / 9 + 1
        );
    };

    if (isLoading)
        return (
            <ListCard>
                <LoadingTopicContainer />
            </ListCard>
        );
    return (
        <ListCard>
            {topics.map((topic, index) => {
                if (getPage(index)) {
                    return (
                        <Item3Parts key={index}>
                            <TopicContainer
                                topic={topic}
                                updateTopicByValue={(value) =>
                                    updateTopicByValue(index, value)
                                }
                            />
                        </Item3Parts>
                    );
                }
                return "";
            })}
            <div className="w-100 d-flex">
                <Pagination
                    page={page}
                    onChange={handleChange}
                    className="ml-auto mt-4"
                    count={getPages()}
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </ListCard>
    );
}

export default ListTopic;
