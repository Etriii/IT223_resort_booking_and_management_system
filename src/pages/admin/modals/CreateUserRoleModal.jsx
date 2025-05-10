import React from "react";

import InputField from "../../../components/ui/form/InputField";
import SelectField from "../../../components/ui/form/SelectField";
const CreateUserRoleModal = ({ handleCreateResortRoleFormChange, formData }) => {



    return (
        <div className="space-y-2 w-80" >
            <InputField type="text" label={'Resort Name'} onChange={handleCreateResortRoleFormChange} name={'name'} required={true} />
            <InputField type="text" label={'Location'} onChange={handleCreateResortRoleFormChange} name={'location'} required={true} />
            <InputField type="text" label={'Location Coordinates'} onChange={handleCreateResortRoleFormChange} name={'location_coordinates'} required={true} />
            <InputField type="number" label={'Tax Rate'} onChange={handleCreateResortRoleFormChange} name={'tax_rate'} required={true} />
            {/* <SelectField label="Status" name="status" onChange={handleFormInputChange}
                options={[
                    { value: "active", label: "Active" },
                    { value: "deactivated", label: "Deactivate" },
                ]} required
            /> */}
            <InputField type="number" label={'Contact Details'} onChange={handleCreateResortRoleFormChange} name={'contact_details'} required={true} />
        </div>
    );
}


export default CreateUserRoleModal;