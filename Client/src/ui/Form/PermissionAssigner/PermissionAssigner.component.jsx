import React from "react";
import InfoAvatar from "../../Avatar/InfoAvatar/InfoAvatar.component";
import styles from "./PermissionAssigner.module.scss";

function PermissionAssigner({
    name = "",
    email = "",
    permissions,
    onChange,
    role,
}) {
    return (
        <div className={styles["permission-assigner"]}>
            <InfoAvatar email={email} fullName={name} />
            <select
                defaultValue={role}
                onChange={onChange}
                className="form-select"
            >
                <option selected>Role</option>
                {permissions.map((permission) => (
                    <option value={permission.id}>{permission.name}</option>
                ))}
            </select>
        </div>
    );
}

export default PermissionAssigner;
