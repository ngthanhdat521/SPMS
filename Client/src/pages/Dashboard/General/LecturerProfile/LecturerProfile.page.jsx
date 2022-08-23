import React, { useEffect, useState } from "react";
import Textbox from "../../../../ui/Form/Textbox/Textbox.component";
import Combobox from "../../../../ui/Form/Combobox/Combobox.component";
import LoadingButton from "@mui/lab/LoadingButton";
import RoundedAvatar from "../../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import styles from "./LecturerProfile.module.scss";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import LecturerService from "../../../../services/Supporter/Lecturer/Lecturer";

function LecturerProfile({}) {
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        depId: "",
        academicLevel: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event, name) => {
        let newProfile = { ...profile };
        newProfile[name] = event.target.value;
        setProfile(newProfile);
    };

    const closeMessage = () => setMessage({ isOpen: false, content: "" });

    const saveChanges = async () => {
        setLoading(true);
        setSubmitted(true);

        let { message } = await LecturerService.edit(profile.userId, profile);

        setMessage(message);
        setLoading(false);
    };

    const onLoad = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let { data } = await LecturerService.getById(user.userId);
        setProfile(data);
    };

    useEffect(onLoad, []);

    return (
        <div className={styles["lecturer-profile"]}>
            <BasicSnackbar
                onClose={closeMessage}
                content={message.content}
                isOpen={message.isOpen}
            />
            <div className="container">
                <div className={styles["lecturer-profile_container"]}>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="d-flex justify-content-center mb-4">
                                <RoundedAvatar
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        fontSize: "50px",
                                        borderRadius: "100%",
                                    }}
                                    name={`${profile.firstName} ${profile.lastName}`}
                                />
                            </div>
                            <div>
                                <h5 className="text-center">
                                    <b>
                                        {profile.firstName
                                            ? `${profile.firstName} ${profile.lastName}`
                                            : "No name"}
                                    </b>
                                </h5>
                                <p
                                    className={
                                        styles["lecturer-profile_email"] +
                                        " text-center mb-1"
                                    }
                                >
                                    {profile.email}
                                </p>
                                <p
                                    className={
                                        styles["lecturer-profile_dep"] +
                                        " text-center light-text"
                                    }
                                >
                                    Software Engineering
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <form>
                                <h1 className="mb-2">Form Update</h1>
                                <p className="light-text">
                                    Update your info and profile
                                </p>
                                <div className="row">
                                    <div className="col-xl-6 col-sm-12">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <Textbox
                                                defaultValue={profile.firstName}
                                                message="First name include at least 2 characters"
                                                regex={/^[A-Za-z\d\s]{2,}$/}
                                                onChange={(e) =>
                                                    handleChange(e, "firstName")
                                                }
                                                isSubmitted={submitted}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <Textbox
                                                message="Last name include at least 3 characters"
                                                regex={/^[A-Za-z\d\s]{3,}$/}
                                                onChange={(e) =>
                                                    handleChange(e, "lastName")
                                                }
                                                isSubmitted={submitted}
                                                defaultValue={profile.lastName}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <Textbox
                                                message="Email is invalid!"
                                                regex={
                                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                }
                                                onChange={(e) =>
                                                    handleChange(e, "email")
                                                }
                                                isSubmitted={submitted}
                                                defaultValue={profile.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Academic</label>
                                            <Textbox
                                                regex={/^/}
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        "academicLevel"
                                                    )
                                                }
                                                isSubmitted={false}
                                                defaultValue={
                                                    profile.academicLevel
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <Textbox
                                                message="Phone include 11 digits!"
                                                regex={/^[\d]{10}$/}
                                                onChange={(e) =>
                                                    handleChange(e, "phone")
                                                }
                                                isSubmitted={submitted}
                                                defaultValue={profile.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <Combobox
                                                onChange={(e) =>
                                                    handleChange(e, "depId")
                                                }
                                                message="Code Level is required"
                                                list={[
                                                    {
                                                        depId: "9097e5ae-325b-493f-9e5b-4bb92390625f",
                                                        depName:
                                                            "Software Engineering",
                                                    },
                                                ]}
                                                shownName="depName"
                                                gettedName="depId"
                                                isSubmitted={submitted}
                                                defaultValue={profile.depId}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <LoadingButton
                                    type="button"
                                    loading={loading}
                                    loadingPosition="start"
                                    // loadingIndicator="Loading..."
                                    variant="contained"
                                    className="w-100"
                                    onClick={saveChanges}
                                >
                                    Save changes
                                </LoadingButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LecturerProfile;
