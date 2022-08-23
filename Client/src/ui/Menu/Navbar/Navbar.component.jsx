import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RoundedAvatar from "../../Avatar/RoundedAvatar/RoundedAvatar.component";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Navbar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../../Communication/Notification/Notification.component";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { axios } from "../../../services/HttpClient/HttpClient";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function Navbar({
    isShownSidebarIcon,
    openSidebar,
    style = {},
}) {
    const themes = [
        {
            name: "Default Mode",
            color: "blue",
            themeValue: 0,
            className: "default-mode"
        },
        {
            name: "Light Mode",
            color: "#b0bec5",
            themeValue: 1,
            className: "light-mode",
        },
        {
            name: "Dark Mode",
            color: "black",
            themeValue: 2,
            className: "dark-mode"
        },
        {
            name: "Red Mode",
            color: "red",
            themeValue: 3,
            className: "red-mode"
        },
        {
            name: "Green Mode",
            color: "green",
            themeValue: 4,
            className: "green-mode"
        },
        {
            name: "Purple Mode",
            color: "purple",
            themeValue: 5,
            className: "purple-mode"
        },
        {
            name: "Orange Mode",
            color: "orange",
            themeValue: 6,
            className: "orange-mode"
        },
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const isLogedIn = useSelector((state) => state.isLogedIn);
    const user = useSelector((state) => state.user);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className={styles["navbar_info-bar"]}>
                <div className="row m-0">
                    <div className="col-3">
                        {" "}
                        <RoundedAvatar
                            style={{ width: "45px", height: "45px" }}
                            src=""
                            name={`${user.firstName} ${user.lastName}`}
                        />
                    </div>
                    <div className="col-9">
                        <h5 className="mb-1">{`${user.firstName} ${user.lastName}`}</h5>
                        <p className="m-0">{user.email}</p>
                    </div>
                </div>
                <div className="dropdown-divider" />
                <MenuItem onClick={handleMenuClose}>
                    <GridViewOutlinedIcon></GridViewOutlinedIcon>
                    <span>Dashboard</span>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ContactPageOutlinedIcon></ContactPageOutlinedIcon>
                    <span>Profile</span>
                </MenuItem>
                <div className="dropdown-divider" />
                <MenuItem
                    onClick={() => {
                        logout();
                        handleMenuClose();
                    }}
                >
                    <LogoutOutlinedIcon></LogoutOutlinedIcon>
                    <span>Logout</span>
                </MenuItem>
            </div>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <div className={styles["navbar_info-bar"]}>
                <MenuItem onClick={handleMenuClose}>
                    <HomeOutlinedIcon />
                    <NavLink to="/home">Home</NavLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <InfoOutlinedIcon />
                    <NavLink to="/about">About</NavLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <HomeOutlinedIcon />
                    <NavLink to="/login">Login</NavLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <InfoOutlinedIcon />
                    <NavLink to="/register-capstone">Register</NavLink>
                </MenuItem>
                <Button className="mx-3" variant="contained">
                    Try Now
                </Button>
            </div>
        </Menu>
    );

    const logout = () => {
        localStorage.clear();
        dispatch({ type: "CLEAR_SESSION" });
        navigate("/home");
    };

    const loadNotification = async () => {
        let { ok, status, data } = await axios({
            url: "/api/notification/list",
            method: "get",
        });

        if (ok && status === 200) setNotifications(data);
    };

    const onLoad = async () => {
        await loadNotification();
    };

    React.useEffect(onLoad, []);

    return (
        <Box className={styles["navbar"] + " main-navbar"} sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={style} className={styles["navbar_box"]}>
                    {isShownSidebarIcon ? (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={openSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        ""
                    )}

                    <h5 className={styles["navbar_logo"] + " main-navbar_logo"}>
                        SPMS
                    </h5>
                    <Box sx={{ display: { xs: "none", md: "none" } }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <NavLink
                                className="d-flex m-auto light-text"
                                style={{ padding: "12px" }}
                                to="/home"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className="d-flex m-auto light-text"
                                style={{ padding: "12px" }}
                                to="/about"
                            >
                                About
                            </NavLink>
                            <NavLink
                                className="d-flex m-auto light-text"
                                style={{ padding: "12px" }}
                                to="/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        </Box>

                        {isLogedIn ? (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                >
                                    <div className="dropdown">
                                        <div data-toggle="dropdown">
                                            <Badge
                                                badgeContent={
                                                    notifications.length
                                                }
                                                color="error"
                                                invisible={
                                                    !notifications.length
                                                }
                                            >
                                                <CampaignOutlinedIcon />
                                            </Badge>
                                        </div>
                                        <div
                                            className={
                                                styles["navbar_dropdown-menu"] +
                                                " dropdown-menu dropdown-menu-right p-3"
                                            }
                                        >
                                            <div className="d-flex justify-content-between mb-2">
                                                <h5>Notification</h5>
                                                <MoreHorizOutlinedIcon />
                                            </div>
                                            {notifications.map(
                                                (notification, index) => (
                                                    <div key={index}>
                                                        {!index || (
                                                            <div className="dropdown-divider" />
                                                        )}
                                                        <Notification
                                                            fullName={
                                                                notification.title
                                                            }
                                                            time={
                                                                notification.createdAt
                                                            }
                                                            message={
                                                                notification.content
                                                            }
                                                            isAvatarVisible={
                                                                false
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <div className="dropdown">
                                        <div data-toggle="dropdown">
                                            <Badge
                                                className=""
                                                badgeContent={17}
                                                color="error"
                                            >
                                                <NotificationsIcon />
                                            </Badge>
                                        </div>
                                        <div
                                            style={{ width: "400px" }}
                                            className="dropdown-menu dropdown-menu-right p-3"
                                        >
                                            <div className="d-flex justify-content-between mb-2">
                                                <h5>Activity</h5>
                                                <MoreHorizOutlinedIcon />
                                            </div>
                                            {/* <Notification
                                                fullName="Nguyen Long"
                                                time="6 days ago"
                                                message="Updated the task"
                                            /> */}
                                        </div>
                                    </div>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <div className="dropdown">
                                        <div data-toggle="dropdown">
                                            <Badge>
                                                <ColorLensOutlinedIcon />
                                            </Badge>
                                        </div>
                                        <div
                                            style={{ width: "300px" }}
                                            className="dropdown-menu dropdown-menu-right p-3"
                                        >
                                            <div className="d-flex justify-content-between mb-2">
                                                <h5>Colors</h5>
                                                <MoreHorizOutlinedIcon />
                                            </div>
                                            <div>
                                                {themes.map((theme, index) => (
                                                    <div key={index}>
                                                        <div
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: "UPDATE_THEME",
                                                                    payload:
                                                                        theme.themeValue,
                                                                });
                                                                document.getElementById("root").className = theme.className;
                                                            }}
                                                            className="d-flex align-items-center py-1"
                                                        >
                                                            <div
                                                                className={
                                                                    styles[
                                                                        "navbar_color-mode"
                                                                    ] + " mr-4"
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles[
                                                                            "navbar_color-mode_light"
                                                                        ]
                                                                    }
                                                                ></div>
                                                                <div
                                                                    style={{
                                                                        background:
                                                                            theme.color,
                                                                    }}
                                                                    className={
                                                                        styles[
                                                                            "navbar_color-mode_sub"
                                                                        ] + ""
                                                                    }
                                                                ></div>
                                                            </div>
                                                            <span>
                                                                {theme.name}
                                                            </span>
                                                        </div>
                                                        <div className="dropdown-divider w-50" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <RoundedAvatar
                                        src=""
                                        name={
                                            user.firstName + " " + user.lastName
                                        }
                                    />
                                </IconButton>
                            </>
                        ) : (
                            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                                <NavLink
                                    className="d-flex m-auto light-text"
                                    style={{ padding: "12px" }}
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className="d-flex m-auto light-text"
                                    style={{ padding: "12px" }}
                                    to="/register-capstone"
                                >
                                    Register
                                </NavLink>
                                <div className="d-flex align-items-center">
                                    <Button sx={{ bgcolor: "white" }}>
                                        Try Now
                                    </Button>
                                </div>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
