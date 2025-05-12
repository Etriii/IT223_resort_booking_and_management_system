import React, { useEffect, useState } from "react";
import Select from "react-select";

import InputField from "../../../components/ui/form/InputField";
import SelectField from "../../../components/ui/form/SelectField";
import { useFetchUser } from "../../../hooks";
import { CgNpm } from "react-icons/cg";

const CreateUserRoleModal = ({ setCreateUserRoleForm }) => {

    const { users, loading, error, fetchUsers } = useFetchUser();

    const options = users.filter(user => user.roles == null) //tanggalon raing filter if gusto ipa see ang mga users
        .map(user => ({
            value: user.id,
            label: user.username
        }));

    // const [selectedUser, setSelectedUser] = useState(null);
    // const [selectedRole, setSelectedRole] = useState(null);

    // const [optionError, setOptionError] = useState(false);
    // console.log(JSON.stringify(users));

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (optionError) {
    //             setOptionError(!optionError);
    //         }
    //     }, 5000);
    // }, [optionError]);

    const handleSelectUser = (option) => {
        // setSelectedUser(option);
        setCreateUserRoleForm(prev => ({ ...prev, user_id: option.value }));
    }

    const handleSelectUserRole = (e) => {
        // const value = e.target.value;
        // setSelectedRole(value);
        setCreateUserRoleForm(prev => ({ ...prev, role_id: e.target.value }));
    }

    return (
        <div className="space-y-2 w-80" >
            {/* <InputField type="text" label={'Username'} onChange={handleCreateResortRoleFormChange} name={'name'} required={true} /> */}

            <Select options={options} onChange={(option) => handleSelectUser(option)} />

            {/* {optionError &&
                <div className={`text-red-600`}>This user is already an admin on a resort</div>
            } */}

            <SelectField label="Role Type" name="role_id" onChange={handleSelectUserRole}
                options={[
                    { value: 3, label: "Resort Admin" },
                    { value: 2, label: "Resort Super Admin" },
                ]} required
            />

            {/* {selectedUser && (
                <p>Selected User: {selectedUser.label}</p>
            )}

            {selectedRole && (
                <p>Selected Role ID: {selectedRole}</p>
            )}


            {createUserRoleForm &&
                <div>
                    user_id: {createUserRoleForm.user_id} <br />
                    role_id: {createUserRoleForm.role_id}
                </div>
            } */}
        </div>
    );
}


export default CreateUserRoleModal;