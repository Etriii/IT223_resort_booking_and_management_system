import React from 'react';

const ReadUserModal = ({ user }) => (
  <div className="space-y-2">
    <div><strong>ID:</strong> {user.id}</div>
    <div><strong>Username:</strong> {user.username}</div>
    <div><strong>Email:</strong> {user.email}</div>
    <div><strong>Role:</strong> {user.role}</div>
  </div>
);

export default ReadUserModal;
