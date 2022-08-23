import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingNotification() {
    return (
        <div className="w-100 p-3 llight-bottom-border">
            <Skeleton
                sx={{ borderRadius: "7px" }}
                variant="rectangular"
                width="100%"
                height={30}
                
            />
            <Skeleton
                sx={{ borderRadius: "7px" }}
                variant="rectangular"
                width="100%"
                height={80}
                className="my-3"
            />
            <Skeleton
                sx={{ borderRadius: "7px" }}
                variant="rectangular"
                width="50%"
                height={30}
            />
        </div>
    );
}
