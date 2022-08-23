import React, { useState } from "react";
import Item3Parts from "../../../ui/Item/Item3Parts/Item3Parts.component";
import LoadingTopicContainer from "../../../ui/Loading/LoadingTopicContainer/LoadingTopicContainer.component";
import Pagination from "@mui/material/Pagination";
import ListCard from "../../../ui/List/ListCard/ListCard.component";
import Group from "../Group/Group.component";

function List({ groups, isLoading, deleteGroup }) {
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getPage = (index) => {
        return index >= page * 9 - 9 && index < page * 9;
    };

    const getPages = () => {
        if (groups.length <= 9) return 1;
        let amount = (groups.length / 9) % 1;
        return Math.round(
            amount === 0 ? groups.length / 9 : groups.length / 9 + 1
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
            {groups.map((group, index) => {
                if (getPage(index)) {
                    return (
                        <Item3Parts key={index}>
                            <Group
                                onDelete={() => deleteGroup(index)}
                                {...group}
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

export default List;
