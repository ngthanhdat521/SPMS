import React from "react";
import FixedForm from "../../../ui/Form/FixedForm/FixedForm.component";
import Member from "../Member/Member.component";
// import styles from './ListMember.module.scss';

function ListMember({ students, mentors, onClose }) {
    return (
        <FixedForm onClose={onClose}>
            <h5 className="mb-4">List Member</h5>
            {mentors.map((mentor, index) => (
                <>
                    {index === 0 || <div className="dropdown-divider" />}
                    <Member {...mentor} role="Mentor" />
                </>
            ))}
            {!students.length && !mentors.length  || <div className="dropdown-divider" />}
            {students.map((student,index) => (
                <>
                    {index === 0 || <div className="dropdown-divider" />}
                    <Member {...student.userInfo} role="Member" />
                </>
            ))}
        </FixedForm>
    );
}

export default ListMember;
