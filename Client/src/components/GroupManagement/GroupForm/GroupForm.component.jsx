import React, { useState } from "react";
import FixedForm from "../../../ui/Form/FixedForm/FixedForm.component";
import UserAssigner from "../../../ui/Form/UserAssigner/UserAssigner.component";
import Textarea from "../../../ui/Form/Textarea/Textarea.component";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import CheckMember from "../../../ui/Form/CheckMember/CheckMember.component";
import PermissionAssigner from "../../../ui/Form/PermissionAssigner/PermissionAssigner.component";
import styles from "./GroupForm.module.scss";
import { Button } from "@mui/material";

function GroupForm({
    groupName = "",
    desc = "",
    members = [],
    text = "Add Group",
    onSubmit,
    children,
}) {
    const [isInvisible, setIsInvisible] = useState(true);
    const [isSubmited, setIsSubmitted] = useState(false);
    const [users, setUsers] = useState([]);

    const [group, setGroup] = useState({
        groupName: groupName,
        desc: desc,
        members: members,
    });

    const permissions = [
        {
            id: 0,
            name: "Mentor",
        },
        {
            id: 1,
            name: "Member",
        },
    ];

    const handleChange = (event, name) => {
        let { value } = event.target;
        group[name] = value;
        setGroup(group);
    };

    const searchUsers = (event) => {
        if (event.target.value) {
            let newUsers = [
                {
                    userId: "1",
                    email: "ng1@gmal.com",
                    firstName: "nguyen",
                    lastName: "van",
                    isChecked: false,
                },
                {
                    userId: "2",
                    email: "ng2@gmal.com",
                    firstName: "le",
                    lastName: "long",
                    isChecked: false,
                },
            ];

            group.members.map((member) => {
                let index = newUsers.findIndex(
                    (user) => user.userId === member.userId
                );
                console.log(newUsers[index]);
                if (index >= 0) newUsers[index].isChecked = true;
            });

            setUsers(newUsers);
        } else setUsers([]);
    };

    const checkMember = (member, index, isChecked) => {
        let newGroup = { ...group };
        if (isChecked) newGroup.members.push(member);
        else {
            let memberIndex = newGroup.members.findIndex(
                (m) => m.userId === member.userId
            );
            newGroup.members.splice(memberIndex, 1);
        }
        setGroup(newGroup);
    };

    const choosePermission = (event, member, index) => {
        let { value } = event.target;
        let newGroup = { ...group };
        newGroup.members[index].role = value;
        setGroup(newGroup);
    };

    const submit = () => {
        group.title = "Untitled";
        group.startDate = new Date().toISOString();
        group.endDate = new Date().toISOString();
        onSubmit(group);
    };

    return (
        <div>
            {isInvisible || (
                <FixedForm onClose={() => setIsInvisible(true)}>
                    <div className="form-group">
                        <label>Title</label>
                        <Textbox
                            defaultValue={group.groupName}
                            regex={/^[a-zA-Z\d]{3,}$/}
                            onChange={(event) =>
                                handleChange(event, "groupName")
                            }
                            isSubmitted={isSubmited}
                            message="groupName include mininum 3 characters!"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <Textarea
                            defaultValue={group.desc}
                            regex={/^[a-zA-Z\d]{3,}$/}
                            onChange={(event) => handleChange(event, "desc")}
                            isSubmitted={isSubmited}
                            message="Description include mininum 3 characters!"
                        />
                    </div>
                    <div className="form-group" >
                        <label>Members</label>
                        <UserAssigner onSearch={searchUsers}>
                            <div className={!users.length || "p-2"}>
                                {users.map((item, index) => (
                                    <div key={index} className="mb-1">
                                        <CheckMember
                                            defaultValue={item.isChecked}
                                            email={item.email}
                                            fullName={`${item.firstName} ${item.lastName}`}
                                            key={index}
                                            onChange={(isChecked) => {
                                                checkMember(
                                                    item,
                                                    index,
                                                    isChecked
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                {group.members.map((member, index) => (
                                    <div
                                        className={
                                            styles["group-form_member"] +
                                            " light-bg px-2 pt-2 mb-2"
                                        }
                                    >
                                        <PermissionAssigner
                                            key={index}
                                            permissions={permissions}
                                            name={`${member.firstName} ${member.lastName}`}
                                            email={member.email}
                                            role={member.role}
                                            onChange={(event) =>
                                                choosePermission(
                                                    event,
                                                    member,
                                                    index
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </UserAssigner>
                    </div>
                    <Button
                        className="w-100 px-1 pt-1"
                        onClick={submit}
                        variant="contained"
                    >
                        {text}
                    </Button>
                </FixedForm>
            )}
            {React.cloneElement(children, {
                onClick: () => setIsInvisible(false),
            })}
        </div>
    );
}

export default GroupForm;
