import React, { useEffect, useState } from 'react'

import Select from 'react-select';

const AdminActivityLogFilters = ({ filters, setFilters }) => {

    const [localFilter, setLocalFilter] = useState(filters);

    const handleLocalChange = (e) => {
        const { name, value } = e.target;

        setLocalFilter((prev) => {
            const updated = { ...prev, [name]: value };

            // If start_date is changed and end_date is before it, adjust end_date
            if (name === "start_date" && new Date(updated.end_date) < new Date(value)) {
                const newEnd = new Date(value);
                newEnd.setDate(newEnd.getDate() + 1);
                updated.end_date = newEnd.toISOString().split("T")[0];
            }

            // If end_date is set earlier than start_date, ignore the change
            if (name === "end_date" && new Date(value) < new Date(prev.start_date)) {
                return prev;
            }

            return updated;
        });
    };

    useEffect(() => {
        setFilters(localFilter);
    }, [localFilter]);

    const tableOptions = [
        { value: 'bookings', label: 'Bookings' },
        { value: 'bookmarks', label: 'Bookmarks' },
        { value: 'buildings', label: 'Buildings' },
        { value: 'payments', label: 'Payments' },
        { value: 'resort_events', label: 'Resort Events' },
        { value: 'rooms', label: 'Rooms' },
        { value: 'resorts', label: 'Resorts' },
        { value: 'room_types', label: 'Room Types' },
        { value: 'users', label: 'Users' },
        { value: 'roles', label: 'Roles' },
        { value: 'booking_details', label: 'Booking Details' },
        { value: 'payment_submissions', label: 'Payment Submissions' },
        { value: 'amenities_category', label: 'Ameninities Categories' },
        { value: 'resort_amenities', label: 'Resort Amenities' },
        { value: 'logged_in_users', label: 'Logged In Users' },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md  w-full max-w-3xl">
                {/* Start Date */}
                <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        value={localFilter.start_date}
                        onChange={handleLocalChange}
                        className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-green-500"
                    />
                </div>

                {/* End Date */}
                <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-600">End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        value={localFilter.end_date}
                        onChange={handleLocalChange}
                        className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-green-500"
                        min={localFilter.start_date} // Ensure valid range
                    />
                </div>

                {/* Table Dropdown */}
                <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="table" className="text-sm font-medium text-gray-600">Table</label>
                    <Select
                        id="table"
                        name="table"
                        options={tableOptions}
                        value={tableOptions.find(option => option.value === localFilter.table)}
                        onChange={selectedOption =>
                            handleLocalChange({
                                target: { name: 'table', value: selectedOption?.value },
                            })
                        }
                        className="mt-1"
                        classNamePrefix="react-select"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md  w-full max-w-3xl">
                <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="table" className="text-sm font-medium text-gray-600">Action</label>
                    <select
                        name="action"
                        id="action"
                        value={localFilter.action}
                        onChange={handleLocalChange}
                        className="mt-1 p-2 border rounded-lg bg-white focus:ring-1 focus:ring-green-500"
                    >
                        <option value="">All</option>
                        <option value="INSERT">INSERT</option>
                        <option value="UPDATE">UPDATE</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                    <label htmlFor="table" className="text-sm font-medium text-gray-600">Resort Id</label>
                    <input
                        name="resort_id"
                        id="resort_id"
                        value={localFilter.resort_id}
                        onChange={handleLocalChange}
                        className="mt-1 p-2 border rounded-lg bg-white focus:ring-1 focus:ring-green-500"
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}

export default AdminActivityLogFilters