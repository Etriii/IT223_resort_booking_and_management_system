import React, { useRef, useState, useEffect } from 'react'
import FilterAndActions from '../../ui/table/FilterAndActions'
import TableData from '../../ui/table/TableData'
import Table from '../../ui/table/Table'
import ToggleDiv from '../../ui/modals/ToggleDiv'
import Pagination from '../../ui/table/Pagination'
import Modal from '../../ui/modals/Modal'
import ActionNotification from '../../../components/ui/modals/ActionNotification';

import { ReservationsFilterModal } from '../../../pages/resort_admin/modals'
import { useFetchReservations, useFetchUserRoleWithResortId } from '../../../hooks'

import { MdOutlineDeleteForever } from 'react-icons/md'
import { BiSolidEditAlt } from 'react-icons/bi'
import { LuEye } from 'react-icons/lu'

const ReservationTables = () => {
  const containerRef = useRef(null);


  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (date) => date.toISOString().split('T')[0];
  const [filters, setFilters] = useState({ paginate: 5, page: 1, start_date: formatDate(today), end_date: formatDate(tomorrow), status: '' });

  const { reservations, setReservations, loading, error, setError, fetchReservations } = useFetchReservations({ filters });


  const [notify, setNotify] = useState({ open: '', variant: '', message: '' });
  const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });

  // Forms
  const [createReservationtForm, setReservationResortForm] = useState({
    values: { user_id: '' },
    errors: { user_id: '' }
  });

  const [editReservationForm, setEditReservationForm] = useState({
    values: { id: '', name: '', location: '', location_coordinates: '', tax_rate: '', status: '', contact_details: '' },
    errors: { id: '', name: '', location: '', location_coordinates: '', tax_rate: '', status: '', email: '', contact_details: '' }
  });

  const [deleteReservationForm, setDeleteReservationForm] = useState({
    resort_id: ''
  });

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const openModal = (variant, reservation) => {
    let children;
    let modal_title;

    switch (variant) {
      case 'create':
        modal_title = 'New Reservation';
        break;
      case 'read':
        modal_title = 'View Reservation';
        break;
      case 'update':
        modal_title = 'Edit Reservation';
        break;
      case 'delete':
        modal_title = 'Delete Reservation';
        break;
      case 'filter':
        children = <ReservationsFilterModal filters={filters} setFilters={setFilters} />;
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
      let result;

      try {
        switch (modal.variant) {
          case 'create':
            result = await createResort(createResortForm.values);
            break;
          case 'update':
            // console.log(editResortForm.values);
            result = await editResort(editResortForm.values);
            break;
          case 'delete':
            result = await deleteResort(deleteResortForm.resort_id);
            break;
          default:
            throw new Error("Unknown action mode");
        }
      } catch (error) {
        setModal(prev => ({ ...prev, loading: false }));
        setNotify({
          open: true,
          type: 'error',
          message: error.message || 'Something went wrong!'
        });
        return;
      }

      setModal(prev => ({ ...prev, loading: false }));

      if (result.success) {
        fetchResorts();
        setNotify({
          open: true,
          type: modal.variant,
          message: result.message
        });
        closeModal();
      } else {
        setNotify({
          open: true,
          type: 'error',
          message: result.message
        });
      }
    }, 1000);
  };


  // Table Filters

  const filteredReservation = reservations?.filter(resort => {
    const statusMatch = !filters.status || resort.status?.toLowerCase().includes(filters.status.toLowerCase());
    return statusMatch;
  }) || [];

  const totalPages = Math.ceil(filteredReservation.length / filters.paginate);
  const paginatedReservation = filteredReservation.slice((filters.page - 1) * filters.paginate, filters.page * filters.paginate);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.paginate]);


  return (
    <div className={`bg-gray-50 lg:order-1 p-4`}>

      <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />
      {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}

      <div className={`sticky top-[4.5rem]`}>
        <FilterAndActions filters={filters} setFilters={setFilters} openModal={openModal} input_filter={{ key_to_filter: 'resort_name', placeholder: 'Username', create_label: 'New' }} />
        <Table theadings={['b_id', 'username', 'room_id', 'check_in', 'check_out', 'total_amount', 'status', 'actions']} isLoading={loading} containerRef={containerRef} >
          {filteredReservation.length > 0 ? (
            paginatedReservation.map((reservation, index) => (
              <TableData
                key={reservation.booking_id || index}
                columns={[
                  reservation.booking_id,
                  reservation.user_name,
                  reservation.room_id,
                  reservation.check_in,
                  reservation.check_out,
                  reservation.total_amount,
                  reservation.status,
                  <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                    <div className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('read', reservation) }}> <LuEye className="size-5 mr-2" />View </div>
                    <div className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('update', reservation) }}> <BiSolidEditAlt className="size-5 mr-2" />Edit </div>
                    <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('delete', reservation) }}> <MdOutlineDeleteForever className="size-5 mr-2" />Delete </div>
                  </ToggleDiv>
                ]}
              />
            ))
          ) : (
            <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No Reservation found.</div></td></tr>
          )}
        </Table>

        <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filteredResorts={filteredReservation} />
      </div>
    </div>
  )
}

export default ReservationTables