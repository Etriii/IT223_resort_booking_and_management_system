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

const ReservationTables = () => {

  const containerRef = useRef(null);

  const { reservations, setReservations, loading, error, setError, fetchReservations } = useFetchReservations(useFetchUserRoleWithResortId);

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

  const openModal = (variant, resort) => {
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

  const [filters, setFilters] = useState({ paginate: 5, page: 1 });

  const filteredReservation = reservations?.filter(resort => {
    return true;
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

      <FilterAndActions filters={filters} setFilters={setFilters} openModal={openModal} input_filter={{ key_to_filter: 'resort_name', placeholder: 'Username', create_label: 'New' }} />

      <Table theadings={['user_id', 'room_id', 'check_in', 'check_out', 'total_amount', 'status', 'actions']} isLoading={loading} containerRef={containerRef} >
        {filteredReservation.length > 0 ? (
          paginatedReservation.map((reservation, index) => (
            <TableData
              key={reservation.id || index}
              columns={[
                reservation.id,
                // // resort.name || 'Resort Name',
                // // (resort.tax_rate ?? '12') + '%',
                // // resort.status || 'Active',
                // // resort.contact_details || '09633127462',
                // // resort.created_at || '2025-04-24',
                // <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                //   <div className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('read', resort) }}> <LuEye className="size-5 mr-2" />View </div>
                //   <div className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('update', resort) }}> <BiSolidEditAlt className="size-5 mr-2" />Edit </div>
                //   <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('delete', resort) }}> <MdOutlineDeleteForever className="size-5 mr-2" />Delete </div>
                // </ToggleDiv>
              ]}
            />
          ))
        ) : (
          <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No Reservation found.</div></td></tr>
        )}
      </Table>

      <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filteredResorts={filteredReservation} />
    </div>
  )
}

export default ReservationTables