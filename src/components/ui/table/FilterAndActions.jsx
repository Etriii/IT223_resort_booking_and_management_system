import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import InputField from "../form/InputField";

const FilterAndActions = ({ filters, setFilters, openModal, input_filter }) => {
    return (
        <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4">
                <button
                    className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-green-500"
                    onClick={() => openModal('filter')}
                >
                    <FiFilter className="text-lg" />
                    Filter
                </button>

                <select
                    value={filters.paginate}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            paginate: parseInt(e.target.value, 10),
                        }))
                    }
                    className="bg-gray-100 rounded p-1 focus:outline-green-500"
                >
                    {[...Array(5)].map((_, i) => (
                        <option key={i + 1} value={(i + 1) * 10}>
                            {(i + 1) * 10} entries
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                    <InputField
                        placeholder={input_filter.placeholder}
                        value={filters[input_filter.key_to_filter] || ''}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                [input_filter.key_to_filter]: e.target.value,
                            }))
                        }
                    />
                </div>
                <button
                    className="px-3 py-[7px] bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition flex space-x-1 items-center text-nowrap"
                    onClick={() => openModal('create')}
                >
                    <IoMdAdd /> <span>{input_filter.create_label}</span>
                </button>
            </div>
        </div>
    );
};

export default FilterAndActions;
