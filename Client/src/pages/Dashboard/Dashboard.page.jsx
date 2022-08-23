import React, { useEffect, useState } from "react";
import Sidebar from "../../ui/Menu/Sidebar/Sidebar.component";
import Navbar from "../../ui/Menu/Navbar/Navbar.component";
import styles from "./Dashboard.module.scss";
import GeneralRouter from "../../router/General/GeneralRouter";
import { Navigate } from "react-router-dom";

function Dashboard() {
    const [isShownSidebar, setIsShownSidebar] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
   

    const showSidebar = () => {
        if (isShownSidebar) {
            return (
                <>
                    <div
                        onClick={() => setIsShownSidebar(false)}
                        className={styles["dashboard_left_dark-bg"]}
                    />
                    <div className={styles["dashboard_left"]}>
                        <Sidebar></Sidebar>
                    </div>
                </>
            );
        }
        return;
    };

    useEffect(() => {
        let isAuthenticated = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(isAuthenticated ? true : false);
    }, []);

    

    if (isAuthenticated) {
        return (
            <div className={styles["dashboard"] + " w-100 h-100 dashboard"}>
                {showSidebar()}
                <div
                    className={
                        styles["dashboard_right"] +
                        (isShownSidebar ? " ml-auto" : " w-100")
                    }
                >
                    <div className="w-100" style={{ position: "absolute" }}>
                        <Navbar
                            openSidebar={() =>
                                setIsShownSidebar(!isShownSidebar)
                            }
                            isShownSidebarIcon={true}
                        ></Navbar>
                    </div>
                    <div
                        className={
                            styles["dashboard_right_body"] +
                            " w-100 dashboard_right"
                        }
                    >
                        <div style={{ height: "64px" }} className="w-100" />
                        <div
                            className={
                                styles["dashboard_right_page"] +
                                " dashboard_right_page"
                            }
                        >
                            <GeneralRouter></GeneralRouter>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return <Navigate to="/login" />;
}

export default Dashboard;
