import React from 'react'
import SelectField from '../../../components/ui/form/SelectField'

const FilterModal = ({ filters, setFilters }) => {
    const handleOnChange = (e) => {
        const status_selected = e.target.value;
        setFilters(prev => ({ ...prev, status: status_selected }));
    }
    return (
        <div>
            <SelectField label={'status'} options={[
                { value: '', label: 'All' },
                { value: "active", label: "Active" },
                { value: "deactivated", label: "Deactivate" },
            ]} onChange={handleOnChange} />
        </div>
    )
}

export default FilterModal