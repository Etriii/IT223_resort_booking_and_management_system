import React, { useEffect } from 'react';
import Button from '../../components/ui/button/Button';
import avatar from '../../assets/images/admin/admin logo.png';


const RAMyAccount = () => {
  useEffect(() => {
    document.title = "My Account | Ocean View";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Account</h2>

        <form className="space-y-4">
        <div className="mt-8 flex justify-center">
          <img
            src={avatar}
            alt="Admin Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"/>
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value="Username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value="example_resort@gmail.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Verified At</label>
            <input
              type="text"
              value="Null"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"/>
            <p className="text-xs text-gray-500 mt-1">Leave this blank if you don't want to change the password.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                   defaultValue="not_active">
                   <option value="active">Active</option>
                   <option value="not_active">Not Active</option>
              </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
            <input
              type="text"
              value="2025-03-31 20:08:04"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"/>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="primary" size="md">Save Changes</Button>
            <Button variant="danger" size="md">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RAMyAccount;
