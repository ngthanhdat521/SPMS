import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router/Router";
import GlobalDialogSupporter from "./services/GlobalSupporter/GlobalDialogSupporter";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./theme/LightTheme";
import defaultTheme from "./theme/DefaultTheme";
import darkTheme from "./theme/DarkTheme";
import redTheme from "./theme/RedTheme";
import greenTheme from "./theme/GreenTheme";
import purpleTheme from "./theme/PurpleTheme";
import orangeTheme from "./theme/OrangeTheme";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    let theme = useSelector((s) => s.theme);
    const dispatch = useDispatch();
    const themes = [
        defaultTheme,
        lightTheme,
        darkTheme,
        redTheme,
        greenTheme,
        purpleTheme,
        orangeTheme,
    ];

    const getTheme = () => {
        let root = document.getElementById("root");

        if (theme === 2) {
            let array = document.querySelectorAll("div");
            document.querySelector(".dashboard_body div").style.background = "#181818";
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                let boxShadow = window.getComputedStyle(element, null).getPropertyValue("box-shadow");
                if (boxShadow !== "none") {
                    // element.style.boxShadow = "0 0 5px 0 rgba(0, 0, 0, 0.3)";
                    element.style.border = "1px solid rgba(255, 255, 255, 0.1)";
                    element.style.background = "#212121";
                }

                let borderColor = window
                    .getComputedStyle(element, null)
                    .getPropertyValue("border-color");

                if (borderColor === "rgb(255, 255, 255)")
                    element.style.borderColor = "#212121";
            }
            root.classList.add("dark-mode");
        }
        if (theme === 1) {
            root.classList.add("light-mode");
        }
        return themes[theme];
    };

    useEffect(async () => {
        GlobalDialogSupporter.initGlobalFunction();
        let isAuthenticated = localStorage.getItem("isAuthenticated");
        console.log(localStorage.getItem("user"));
        if (isAuthenticated) {
            let user = JSON.parse(localStorage.getItem("user"));
            dispatch({ type: "UPDATE_SESSION", payload: user });
        } else dispatch({ type: "UPDATE_AUTHENTICATION", payload: false });
    }, []);

    return (
        <ThemeProvider theme={getTheme()}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="*" element={<AppRouter />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
