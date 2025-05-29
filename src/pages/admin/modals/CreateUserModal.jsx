import React from "react";
import InputField from "../../../components/ui/form/InputField";
import SelectField from "../../../components/ui/form/SelectField";

const CreateUserModal = ({ handleCreateFormInputChange, formData }) => {
  return (
    <div className="space-y-2 w-80">
      <InputField
        type="text"
        label="Username"
        onChange={handleCreateFormInputChange}
        name="username"
        required={true}
      />
      <InputField
        type="email"
        label="Email"
        onChange={handleCreateFormInputChange}
        name="email"
        required={true}
      />
      <SelectField
        label="Role"
        name="role"
        onChange={handleCreateFormInputChange}
        options={[
          { value: "super_admin", label: "Super Admin" },
          { value: "super_resort_admin", label: "Super Resort Admin" },
          { value: "guest", label: "Guest" },
        ]}
        required
      />
    </div>
  );
};

export default CreateUserModal;
