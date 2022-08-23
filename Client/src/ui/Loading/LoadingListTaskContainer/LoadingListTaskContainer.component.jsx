import React from "react";
import LoadingTask from "../LoadingListTask/LoadingListTask.component";

function LoadingListTaskContainer() {
    return Array(3)
        .fill(0)
        .map((n, index) => (
            <div className="mr-3">
                <LoadingTask key={index} />
            </div>
        ));
}

export default LoadingListTaskContainer;
