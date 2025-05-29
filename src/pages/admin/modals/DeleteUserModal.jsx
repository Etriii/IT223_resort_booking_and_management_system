import React from 'react';

const DeleteUserModal = ({ user }) => (
  <div className="px-5 py-2 text-center text-red-900 max-w-96">
    Are you sure you want to delete user <strong>{user.username}</strong> (ID: {user.id})?
  </div>
);

export default DeleteUserModal;
