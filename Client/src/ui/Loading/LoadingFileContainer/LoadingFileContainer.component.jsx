import React from "react";
import LoadingFile from "../LoadingFile/LoadingFile.component";

function LoadingFileContainer() {
    return Array(6)
        .fill(0)
        .map((n, index) => <div className="p-3"><LoadingFile key={index} /></div>);
}

export default LoadingFileContainer;
