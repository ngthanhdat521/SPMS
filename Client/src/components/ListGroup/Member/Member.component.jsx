import React from "react";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import styles from "./Member.module.scss";

function Member({ firstName, lastName, email, phone, role }) {
    let fullName = `${firstName} ${lastName}`;

    return (
        <div className={styles["member"] + " d-flex mt-2"}>
            <RoundedAvatar name={fullName} />
            <div className="ml-3">
                <h5 className="mb-0">
                    {fullName} ({role})
                </h5>
                <span>
                    {email} {phone ? "-" : ""} {phone}
                </span>
            </div>
        </div>
    );
}

export default Member;
