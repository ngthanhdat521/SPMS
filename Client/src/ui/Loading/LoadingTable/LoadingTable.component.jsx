import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingTable() {
    return (
        <div className="w-100 h-100 p-5">
            <div>
                <div className="d-flex justify-content-between">
                    <Skeleton
                        sx={{ borderRadius: "7px" }}
                        variant="rectangular"
                        width="100%"
                        height={30}
                    />
                </div>
                <div>
                    <div className="mt-3">
                        <div className="d-flex">
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="60%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="85%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "30%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="85%"
                                    height={30}
                                />
                            </div>
                        </div>
                        <div className="d-flex" style={{marginTop:"30px"}}>
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="70%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="50%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="95%"
                                    height={30}
                                />
                            </div>
                        </div>

                        <div className="d-flex"  style={{marginTop:"30px"}}>
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="90%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="70%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="80%"
                                    height={30}
                                />
                            </div>
                            
                        </div>

                        <div className="d-flex"  style={{marginTop:"30px"}}>
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="80%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="80%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="50%"
                                    height={30}
                                />
                            </div>
                            
                        </div>

                        <div className="d-flex"  style={{marginTop:"30px"}}>
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="70%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="50%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="95%"
                                    height={30}
                                />
                            </div>
                        </div>

                        <div className="d-flex"  style={{marginTop:"30px"}}>
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="90%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="70%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="80%"
                                    height={30}
                                />
                            </div>
                            
                        </div>

                        <div className="d-flex"  style={{marginTop:"30px"}}>
                            <div style={{ width: "20%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="80%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="80%"
                                    height={30}
                                />
                            </div>
                            <div style={{ width: "40%" }}>
                                <Skeleton
                                    sx={{ borderRadius: "7px" }}
                                    variant="rectangular"
                                    width="50%"
                                    height={30}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
