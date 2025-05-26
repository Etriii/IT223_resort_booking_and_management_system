import { useEffect, useRef, useState } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import { LuEye } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

import ActionNotification from '../../components/ui/modals/ActionNotification';
import Modal from '../../components/ui/modals/Modal';
import { ActivityLogFilters, ViewActivityLog } from './modals/index';

import { useFetchActivityLogs } from '../../hooks/index';

import Pagination from "../../components/ui/table/Pagination";

const ResortActivityLogs = () => {
  document.title = "Activity Logs | Ocean View";

  const containerRef = useRef(null);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (date) => date.toISOString().split('T')[0];
  const [filters, setFilters] = useState({
    paginate: 5, page: 1, start_date: formatDate(today), end_date: formatDate(tomorrow), table: 'bookings', action: '', username: ''
  });

  const { activityLogs, setActivityLogs, loading, error, setError, fetchActivityLogs } = useFetchActivityLogs({ filters });

  const [notify, setNotify] = useState({ open: '', variant: '', message: '' });
  const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const openModal = (variant, log) => {
    // i visit lang ang modal nga component naa didto ang mga variant
    let children;
    let modal_title;

    switch (variant) {
      case 'read':
        modal_title = 'View Activity Logs';
        children = <ViewActivityLog log={log} />;
        break;
      case 'filter':
        children = <ActivityLogFilters filters={filters} setFilters={setFilters} />;
        modal_title = 'Filters';
        break;
      default:
        children = <>Nahh wala</>;
    }
    setModal({ isOpen: true, variant, children, loading: false, title: modal_title });
  };

  const handleConfirm = () => {
    setModal(prev => ({ ...prev, loading: true }));//pang loading rani sa button
    setNotify({}); //reset ang notif ni ha

    setTimeout(async () => {
      setModal(prev => ({ ...prev, loading: false }));
    }, 1000);
  };

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Filters

  const filteredLogs = activityLogs?.filter(log => {
    const usernameMatch = !filters.username || log.triggered_by?.toLowerCase().includes(filters.username.toLowerCase());
    const actionMatch = !filters.action || log.action?.toLowerCase().includes(filters.action.toLowerCase());
    return usernameMatch && actionMatch;
  }) || [];

  const totalPages = Math.ceil(filteredLogs.length / filters.paginate);
  const paginatedLogs = filteredLogs.slice((filters.page - 1) * filters.paginate, filters.page * filters.paginate);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.paginate]);

  // useEffect(() => { console.log(filters) }, [filters]);

  return (
    <div>
      <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />
      {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}

      <div className="flex items-center justify-between flex-wrap mb-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { openModal('filter') }}
            className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiFilter className="text-lg" />
            Filter
          </button>

          <select
            className="px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-green-600"
            value={filters.paginate}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setFilters((prev) => ({ ...prev, paginate: value }));
            }}
          >
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>
                {num} entries
              </option>
            ))}
          </select>
          <div>
            Table: <span className={`font-semibold text-green-600`}>{filters.table}</span>
          </div>
          <div>
            Date:{" "}
            <span className={`font-semibold text-green-600`}>
              {new Date(filters.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              to{" "}
              {new Date(filters.end_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            name="username"
            placeholder="Search by Triggered By"
            value={filters.username}
            onChange={handleUsernameChange}
            className="h-9 px-3 border rounded-md focus:outline-green-600 min-w-[150px]"
          />
        </div>
      </div>

      {/* {filteredLogs && JSON.stringify(filteredLogs)} */}

      <Table
        theadings={["ID", "Affected Record ID", "Action", "Triggered By", "Triggered At", "Actions"]}
        containerRef={containerRef}
        isLoading={loading}
      >
        {filteredLogs.length > 0 ? (
          paginatedLogs.map((log, index) => (
            <TableData
              key={log.id || index}
              columns={[
                log.id,
                log.affected_id,
                log.action,
                log.triggered_by,
                <>{new Date(log.created_at).toLocaleString()}</>,
                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                  <div className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('read', log) }}> <LuEye className="size-5 mr-2" />View </div>
                  {/* <div className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('update', log) }}> <BiSolidEditAlt className="size-5 mr-2" />Edit </div> */}
                  {/* <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('delete', log) }}> <MdOutlineDeleteForever className="size-5 mr-2" />Delete </div> */}
                </ToggleDiv>
              ]}
            />
          ))
        ) : (
          <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No Reservation found.</div></td></tr>
        )}
      </Table>

      <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filtered={filteredLogs} />
    </div>
  );
};

export default ResortActivityLogs;
