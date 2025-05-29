import React, { useEffect } from 'react'

const DeleteUserRoleModal = ({ userRole, setDeleteUserRoleForm }) => {
    useEffect(() => {
        setDeleteUserRoleForm(
            { user_role_id: userRole.id }
        );
    }, []);
    return (
        <div className='px-2 py-1 text-xl text-center rounded-lg text-red-900 max-w-96'>Are you sure you want to delete the role of  {userRole.username} in {userRole.resort_name}?</div>
    )
}

export default DeleteUserRoleModal