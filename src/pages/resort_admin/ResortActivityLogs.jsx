import { useEffect, useRef, useState } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import { LuEye } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { apiFetch } from '../../utils/apiFetch';

const ResortActivityLogs = () => {
  const containerRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: "",
    username: "",
    fromDate: "",
    toDate: "",
    sort: "latest",
    page: 1,
    paginate: 10,
  });

  const [tempFilters, setTempFilters] = useState({ ...filters });
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://your-api-url/api.php?controller=Logs&action=getAdminActivityLogs`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: filters.username,
    page: filters.page,
    limit: filters.paginate,
  }),
});


      const data = await response.json();

      if (data?.success) {
        setLogs(data.logs || []);
        setTotalLogs(data.total || 0);
      } else {
        setLogs([]);
        setTotalLogs(0);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setNotify({
        type: "error",
        message: "Failed to load activity logs.",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      ...tempFilters,
      page: 1,
    }));
  };

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleView = (logId) => {
    alert(`Viewing log with ID: ${logId}`);
  };

  const totalPages = Math.ceil(totalLogs / filters.paginate);

  return (
    <div>
      {notify?.message && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md mb-4 text-sm">
          {notify.message}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={applyFilters}
            className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiFilter className="text-lg" />
            Filter
          </button>

          <select
            className="px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-green-600"
            value={tempFilters.paginate}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTempFilters((prev) => ({ ...prev, paginate: value }));
            }}
          >
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>
                {num} entries
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
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
      </div>


      <Table
        theadings={["ID", "Username", "Activity", "Date", "Actions"]}
        containerRef={containerRef}
        isLoading={loading}
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
              <div className="p-4 text-center text-gray-500 text-sm">
                No activity logs found.
              </div>
            </td>
          </tr>
        )}
      </Table>

   
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <span className="mb-2 sm:mb-0">
          Showing {(filters.page - 1) * filters.paginate + 1} to{" "}
          {Math.min(filters.page * filters.paginate, totalLogs)} of {totalLogs} entries
        </span>

        <div className="flex items-center space-x-2">
          <button
            disabled={filters.page === 1}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded-md text-sm ${
                filters.page === i + 1
                  ? "bg-green-500 text-white"
                  : "text-green-500 hover:bg-green-100"
              } transition`}
              onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={filters.page === totalPages}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResortActivityLogs;
