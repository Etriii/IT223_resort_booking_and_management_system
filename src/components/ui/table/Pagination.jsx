import React from 'react';

const Pagination = ({ filters, setFilters, totalPages, filtered }) => {

    const getPageNumbers = (totalPages, currentPage) => {
        const delta = 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="flex md:justify-between md:items-center md:flex-row p-2 flex-wrap justify-center items-center flex-col-reverse space-y-2">
            <div>
                <span>
                    Showing {(filters.page - 1) * filters.paginate + 1} - {Math.min(filters.page * filters.paginate, filtered.length)} of {filtered.length} entries
                </span>
            </div>

            <div className="flex items-center space-x-2">
                {/* Previous */}
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={filters.page === 1}
                    className="px-3 py-1 rounded-md text-green-600 hover:bg-green-100 disabled:opacity-50"
                >
                    &lt;
                </button>

                {/* Page Numbers */}
                {getPageNumbers(totalPages, filters.page).map((page, index) =>
                    page === '...' ? (
                        <span key={index} className="px-3 py-1 text-green-400">...</span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => setFilters(prev => ({ ...prev, page }))}
                            className={`px-3 py-1 rounded-md border border-green-300 ${filters.page === page
                                ? 'bg-green-600 text-white font-semibold'
                                : 'text-green-600 hover:bg-green-100'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={filters.page === totalPages}
                    className="px-3 py-1 rounded-md text-green-600 hover:bg-green-100 disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
