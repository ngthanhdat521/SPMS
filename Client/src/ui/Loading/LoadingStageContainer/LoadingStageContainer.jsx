import React from "react";
import LoadingStage from "../LoadingStage/LoadingStage.component";

function LoadingStageContainer() {
    return Array(3)
        .fill(0)
        .map((n, index) => (
            <div className="p-2">
                <LoadingStage key={index} />
            </div>
        ));
}

export default LoadingStageContainer;
