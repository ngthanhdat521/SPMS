import React from "react";
import styles from "./Sidebar.module.scss";
// components
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
// icon
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TodayIcon from "@mui/icons-material/Today";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import { useSelector } from "react-redux";

function Sidebar() {
    const { roleUser } = useSelector((s) => s.user);

    const checkPermissions = (requiredRoles) => {
        let isAccepted = false;
        roleUser.map((role) => {
            if (requiredRoles.includes(role)) isAccepted = true;
        });
        return isAccepted;
    };

    return (
        <div className={styles["sidebar"] + " sidebar"}>
            <List
                className="dashboard_sidebar_main"
                sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        style={{ position: "inherit" }}
                        component="div"
                        id="nested-list-subheader"
                    >
                        Sidebar
                    </ListSubheader>
                }
            >
                <NavLink className="base-link" to="/dashboard/introduction">
                    <ListItemButton>
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Introduction" />
                    </ListItemButton>
                </NavLink>

                <NavLink
                    className="base-link"
                    to="/dashboard/activity-notification"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <CampaignOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notification" />
                    </ListItemButton>
                </NavLink>

                {!checkPermissions(["student"]) || (
                    <>
                        <NavLink
                            className="base-link"
                            to="/dashboard/task-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Task Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink className="base-link" to="/dashboard/my-topic">
                            <ListItemButton>
                                <ListItemIcon>
                                    <FormatListNumberedOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Topic" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/sample-topic"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <FeaturedPlayListOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sample Topic" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/sample-document"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <CloudDownloadOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sample Document" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/list-group"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="List Group" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/council-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <SecurityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Council Management" />
                            </ListItemButton>
                        </NavLink>
                    </>
                )}

                {!checkPermissions(["student", "mentor"]) || (
                    <>
                        <NavLink className="base-link" to="/dashboard/my-group">
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Group" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink className="base-link" to="/dashboard/calendar">
                            <ListItemButton>
                                <ListItemIcon>
                                    <TodayIcon />
                                </ListItemIcon>
                                <ListItemText primary="Calendar" />
                            </ListItemButton>
                        </NavLink>
                    </>
                )}

                {!checkPermissions(["moderator"]) || (
                    <>
                        <NavLink
                            className="base-link"
                            to="/dashboard/lecturer-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Lecturer Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/student-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Student Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/topic-approval"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <FactCheckOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Topic Approval" />
                            </ListItemButton>
                        </NavLink>

                        <NavLink
                            className="base-link"
                            to="/dashboard/group-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Group Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/council-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <SecurityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Council Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/sample-document"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <CloudDownloadOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sample Document" />
                            </ListItemButton>
                        </NavLink>
                    </>
                )}

                {!checkPermissions(["admin"]) || (
                    <>
                        <NavLink
                            className="base-link"
                            to="/dashboard/lecturer-account-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Lecturer Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/student-account-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Student Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/document-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <CloudDownloadOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Document Management" />
                            </ListItemButton>
                        </NavLink>
                    </>
                )}

                {!checkPermissions(["mentor"]) || (
                    <>
                        <NavLink
                            className="base-link"
                            to="/dashboard/topic-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <FeaturedPlayListOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Topic Management" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/lecturer-profile"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <PermIdentityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/contribution-report"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <SsidChartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contribution Report" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/grade-form"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <GradingOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Grade Form" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/sample-document"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <CloudDownloadOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sample Document" />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            className="base-link"
                            to="/dashboard/council-management"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <SecurityOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Council Management" />
                            </ListItemButton>
                        </NavLink>
                    </>
                )}

                {!checkPermissions(["mentor","student","moderator"]) || (
                    <>
                        <NavLink
                            className="base-link"
                            to="/dashboard/score-board"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <StickyNote2OutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Score Board" />
                            </ListItemButton>
                        </NavLink>
                        
                    </>
                )}
            </List>
        </div>
    );
}

export default Sidebar;
