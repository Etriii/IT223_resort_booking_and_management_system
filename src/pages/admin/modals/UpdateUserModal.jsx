import React from 'react';
import InputField from '../../../components/ui/form/InputField';
import SelectField from '../../../components/ui/form/SelectField';

const UpdateUserModal = ({ handleInputChange, formData }) => (
  <div className="space-y-2 w-80">
    <InputField label="Username" name="username" value={formData.username} onChange={handleInputChange} required />
    <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
    <SelectField
      label="Role"
      name="role"
      value={formData.role}
      onChange={handleInputChange}
      options={[
        { value: "admin", label: "Admin" },
        { value: "staff", label: "Staff" },
      ]}
      required
    />
  </div>
);

export default UpdateUserModal;
