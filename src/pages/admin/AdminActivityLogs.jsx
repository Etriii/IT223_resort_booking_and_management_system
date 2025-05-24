import { useState, useEffect, useRef } from 'react';
import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';
import ToggleDiv from '../../components/ui/modals/ToggleDiv';
import Pagination from '../../components/ui/table/Pagination';
import { LuEye } from 'react-icons/lu';
import { apiFetch } from '../../utils/apiFetch';

const AdminActivityLogs = () => {
  const containerRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: '',
    username: '',
    fromDate: '',
    toDate: '',
    page: 1,
    paginate: 10,
  });

 
  const [tempFilters, setTempFilters] = useState({ ...filters });

  const [totalLogs, setTotalLogs] = useState(0);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`controller=Logs&action=getAdminActivityLogs`, {
        method: 'POST',
        body: JSON.stringify({
          search: filters.searchTerm,
          username: filters.username,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          page: filters.page,
          limit: filters.paginate,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setLogs(data.logs || []);
        setTotalLogs(data.total || 0);
      } else {
        setLogs([]);
        setTotalLogs(0);
      }
    } catch (error) {
      setNotify({
        type: 'error',
        message: error.message || 'Failed to load logs.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Admin Activity Logs | Ocean View';
    fetchLogs();
  }, [filters]);

  
  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({ ...prev, [name]: value }));
  };

 
  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      ...tempFilters,
      page: 1, 
    }));
  };

 
  const totalPages = Math.ceil(totalLogs / filters.paginate);

  
  const handleView = (id) => {
    alert(`Viewing log ID: ${id}`);
  };

  return (
    <div className="p-4 space-y-4">
      {notify?.message && (
        <div className={`p-2 rounded mb-2 text-sm ${notify.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {notify.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={applyFilters}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
        >
          Filter
        </button>

        <select
          name="paginate"
          value={tempFilters.paginate}
          onChange={handleTempChange}
          className="h-9 px-3 border rounded-md text-sm focus:outline-green-600"
        >
          <option value="5">5 entries</option>
          <option value="10">10 entries</option>
          <option value="20">20 entries</option>
          <option value="50">50 entries</option>
        </select>

        <input
          type="text"
          name="searchTerm"
          placeholder="Search Activity"
          value={tempFilters.searchTerm}
          onChange={handleTempChange}
          className="h-9 px-3 border rounded-md focus:outline-green-600 min-w-[150px]"
        />

        <input
          type="date"
          name="fromDate"
          value={tempFilters.fromDate}
          onChange={handleTempChange}
          className="h-9 px-3 border rounded-md text-sm focus:outline-green-600"
        />

        <input
          type="date"
          name="toDate"
          value={tempFilters.toDate}
          onChange={handleTempChange}
          className="h-9 px-3 border rounded-md text-sm focus:outline-green-600"
        />

        <input
          type="text"
          name="username"
          placeholder="Search by Username"
          value={tempFilters.username}
          onChange={handleTempChange}
          className="h-9 px-3 border rounded-md focus:outline-green-600 min-w-[150px]"
        />
      </div>

      {/* Table */}
      <Table
        theadings={['ID', 'Username', 'Activity', 'Date', 'Actions']}
        isLoading={loading}
        containerRef={containerRef}
      >
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <TableData
              key={log.id || index}
              columns={[
                log.id,
                log.username,
                log.activity,
                log.timestamp,
                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                  <div
                    className="px-3 py-2 flex items-center hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                    onClick={() => handleView(log.id)}
                  >
                    <LuEye className="mr-2 text-lg" /> View
                  </div>
                </ToggleDiv>,
              ]}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="p-4 text-center text-gray-500 text-sm">No activity logs found.</div>
            </td>
          </tr>
        )}
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <span className="mb-2 sm:mb-0">
          Showing {(filters.page - 1) * filters.paginate + 1} to{' '}
          {Math.min(filters.page * filters.paginate, totalLogs)} of {totalLogs} entries
        </span>

        <div className="flex items-center space-x-2">
          <button
            disabled={filters.page === 1}
            onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
            className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded-md text-sm ${
                filters.page === i + 1 ? 'bg-green-500 text-white' : 'text-green-500 hover:bg-green-100'
              } transition`}
              onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={filters.page === totalPages}
            onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminActivityLogs;
