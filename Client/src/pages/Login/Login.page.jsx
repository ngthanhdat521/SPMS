import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import ObjectChecker from "../../services/Object/ObjectChecker";
import ValidatedIconTextbox from "../../ui/Form/ValidatedIconTextbox/ValidatedIconTextbox.component";
import { axios } from "../../services/HttpClient/HttpClient";
import styles from "./Login.module.scss";
import BasicAlert from "../../ui/Alert/BasicAlert/BasicAlert.component";
import FormCartoonImage from "../../ui/CartoonSVG/FormCartoonImage/FormCartoonImage.component";
import Student from "../../services/Supporter/Student/Student";
import Lecturer from "../../services/Supporter/Lecturer/Lecturer";

function Login() {
    const [account, setAccount] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (event, name) => {
        var { value } = event.target;
        account[name] = value;
        setAccount({ ...account });
        setMessage("");
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        var isValidAccount = ObjectChecker.isEmptyKey(account);
        setIsSubmitted(true);

        if (!isValidAccount) {
            setLoading(true);

            setTimeout(async () => {
                setLoading(false);
                const { ok, data, status } = await axios({
                    url: "/api/user/signin",
                    data: account,
                    method: "post",
                });

                if (ok) {
                    if (status === 200) {
                        localStorage.setItem("user", JSON.stringify(data));
                        localStorage.setItem("isAuthenticated", true);

                        if (data.roleUser.includes("student")) {
                            let studentInfo = await Student.getById(
                                data.userId
                            );
                            localStorage.setItem(
                                "info",
                                JSON.stringify(studentInfo.data.studentInfo)
                            );
                        } else {
                            let lecturerInfo = await Lecturer.getById(
                                data.userId
                            );
                            localStorage.setItem(
                                "info",
                                JSON.stringify(lecturerInfo.data)
                            );
                        }

                        dispatch({ type: "UPDATE_SESSION", payload: data });
                        navigate("/dashboard/introduction");
                    }
                } else setMessage("Your account is invalid!");
            }, 1000);
        }
    };

    return (
        <div className={styles["login"]}>
            <div className={styles["login_row"] + " row w-100"}>
                <div className="col-xl-6 col-lg-6 col-md-12 w-100 h-100">
                    <div
                        className={
                            styles["login_left"] +
                            " d-flex justify-content-center align-items-center w-100 h-100"
                        }
                    >
                        {/* <img src="assets/images/login_image.svg" alt="SVG" /> */}
                        <FormCartoonImage />
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 w-100 h-100">
                    <div
                        className={
                            styles["login_right"] +
                            " d-flex align-items-center justify-content-end w-100 h-100"
                        }
                    >
                        <div className={styles["login_right_form"]}>
                            <form onSubmit={onSubmit}>
                                <h3>Sign In</h3>
                                <p className="light-text">
                                    Welcome to SPMS. <br />
                                    Please enter your email and password.
                                </p>
                                {message ? (
                                    <BasicAlert severity="warning">
                                        {message}
                                    </BasicAlert>
                                ) : (
                                    ""
                                )}

                                <div className={styles["login_right_textbox"]}>
                                    <ValidatedIconTextbox
                                        isRequired={true}
                                        isSubmitted={isSubmitted}
                                        placeholder="Email"
                                        Icon={() => (
                                            <EmailOutlinedIcon
                                                sx={{ fontSize: "1.3rem" }}
                                            />
                                        )}
                                        type="text"
                                        onChange={(event) =>
                                            onChange(event, "email")
                                        }
                                        regex={
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        }
                                        regexMessage="Your email is invalid!"
                                        requiredMessage="Email is required!"
                                    />
                                </div>
                                <div className={styles["login_right_textbox"]}>
                                    <ValidatedIconTextbox
                                        isRequired={true}
                                        isSubmitted={isSubmitted}
                                        placeholder="Password"
                                        Icon={() => (
                                            <LockIcon
                                                sx={{ fontSize: "1.3rem" }}
                                            />
                                        )}
                                        type="password"
                                        onChange={(event) =>
                                            onChange(event, "password")
                                        }
                                        regex={/^[A-Za-z\d\s]{5,}$/}
                                        regexMessage="Password include minimum 1 character in a-z A-Z 0-9 and at least 8 characters!"
                                        requiredMessage="Password is required!"
                                    />
                                </div>
                                <div className={styles["login_right_undertb"]}>
                                    <span>
                                        <Checkbox defaultChecked />
                                        <span className="light-text">
                                            Remember me
                                        </span>
                                    </span>
                                    <span className="light-text">
                                        Forgot password ?
                                    </span>
                                </div>
                                <LoadingButton
                                    type="submit"
                                    loading={loading}
                                    loadingPosition="start"
                                    // loadingIndicator="Loading..."
                                    variant="contained"
                                    className="w-100"
                                >
                                    Login
                                </LoadingButton>
                            </form>
                            <div
                                className={
                                    styles["login_right_undertb"] + " mt-5"
                                }
                            >
                                <Link to="/home">
                                    <span className="default-text d-flex align-items-center">
                                        <ArrowBackIcon
                                            className="mr-1"
                                            sx={{ fontSize: ".9rem" }}
                                        ></ArrowBackIcon>{" "}
                                        Home
                                    </span>
                                </Link>

                                <Link to="/register-capstone">
                                    <span className="default-text">
                                        Need a capstone ?
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
