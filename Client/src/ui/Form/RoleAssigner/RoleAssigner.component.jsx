import React from 'react';
import styles from './RoleAssigner.module.scss';
function RoleAssigner({roles, onChange, defaultValue}) {
    return (
        <div className={styles['role-assigner']}>
            <select
                value={defaultValue}
                onChange={(e) => onChange(e)}
                className={styles["form-select"]}
            >
                <option value="" selected>select role</option>
                {roles.map((role, index) => (
                    <option key={index} value={role.roleId}>{role.roleName}</option>
                ))}
            </select>
        </div>
    );
}

export default RoleAssigner;