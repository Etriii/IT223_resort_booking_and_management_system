import React from "react";

import InputField from "../../../components/ui/form/InputField";
import SelectField from "../../../components/ui/form/SelectField";
const CreateResortModal = ({ handleFormInputChange, formData, errorData }) => {

    return (
        <div className="space-y-2">
            <InputField type="text" label={'Resort Name'} onChange={handleFormInputChange} name={'name'} required={true} />
            <InputField type="text" label={'Location'} onChange={handleFormInputChange} name={'location'} required={true} />
            <InputField type="text" label={'Location Coordinates'} onChange={handleFormInputChange} name={'location_coordinates'} required={true} />
            <InputField type="number" label={'Tax Rate'} onChange={handleFormInputChange} name={'tax_rate'} required={true} />
            <SelectField label="Status" name="status" onChange={handleFormInputChange}
                options={[
                    { value: "active", label: "Active" },
                    { value: "deactivated", label: "Deactivate" },
                ]} required
            />
            <InputField type="number" label={'Contact Details'} onChange={handleFormInputChange} name={'contact_details'} required={true} />

        </div>
    );
}


export default CreateResortModal;