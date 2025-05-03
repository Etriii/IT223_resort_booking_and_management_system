import React from 'react';

const Pagination = ({ filters, setFilters, totalPages, filteredResorts }) => {
    return (
        <div className="flex md:justify-between md:items-center md:flex-row p-2 flex-wrap justify-center items-center flex-col-reverse space-y-2">
            <div>
                <span>
                    Showing {(filters.page - 1) * filters.paginate + 1} - {Math.min(filters.page * filters.paginate, filteredResorts.length)} of {filteredResorts.length} entries
                </span>
            </div>
            <div className="flex items-center space-x-2">
                {/* First */}
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: 1 }))}
                    disabled={filters.page === 1}
                    className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    &laquo;
                </button>

                {/* Prev */}
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={filters.page === 1}
                    className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    &lt;
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                        className={`px-3 py-1 rounded-md ${filters.page === i + 1
                            ? 'bg-green-500 text-white font-semibold'
                            : 'text-green-500 hover:bg-green-100'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={filters.page === totalPages}
                    className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    &gt;
                </button>

                {/* Last */}
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: totalPages }))}
                    disabled={filters.page === totalPages}
                    className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
