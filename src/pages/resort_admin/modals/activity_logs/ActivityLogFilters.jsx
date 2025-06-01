import React, { useEffect, useState } from 'react'

const ActivityLogFilters = ({ filters, setFilters }) => {

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

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-2xl w-full max-w-3xl">
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
                <select
                    name="table"
                    id="table"
                    value={localFilter.table}
                    onChange={handleLocalChange}
                    className="mt-1 p-2 border rounded-lg bg-white focus:ring-1 focus:ring-green-500"
                >
                    {/* bookings, bookmarks, buildings, payments, resortEvents, Resorts, Reviews, Rooms */}
                    <option value="bookings">Bookings</option>
                    <option value="bookmarks">Bookmarks</option>
                    <option value="reviews">Reviews</option>
                    <option value="buildings">Buidlings</option>
                    <option value="payments">Payments</option>
                    <option value="resort_events">Resort Events</option>
                    <option value="rooms">Rooms</option>
                    <option value="resorts">Resorts</option>
                    <option value="payment_submissions
">Payment Submission</option>
                </select>
            </div>

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
        </div>
    )
}

export default ActivityLogFilters