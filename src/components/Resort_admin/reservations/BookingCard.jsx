import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useFetchRoomById } from "../../../hooks";

import { MdWarningAmber } from "react-icons/md";

import { useFetchPaymentByBookingId } from "../../../hooks";
import Modal from "../../ui/modals/Modal";
import ActionNotification from "../../ui/modals/ActionNotification";
import SubmittedPaymentModal from "./SubmittedPaymentModal";

const BookingCard = ({ booking, fetchReservations }) => {
  const defaultImage = "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";

  const { room, loading, error, fetchRoom } = useFetchRoomById(booking.room_id);

  const { payment, loading: loadingPayment, error: errorPayment, fetchPayment } = useFetchPaymentByBookingId(booking.booking_id);//useFetchPaymentByBookingId

  useEffect(() => {
    // console.log(booking)
    fetchRoom(booking.room_id);
  }, [booking.room_id]);



  const [notify, setNotify] = useState({ open: '', variant: '', message: '' });
  const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const openModal = (variant, payment) => {
    let children;
    let modal_title;

    switch (variant) {
      case 'read':
        modal_title = 'Submitted Payemnt';
        children = <SubmittedPaymentModal payment={payment} closeModal={closeModal} fetchPayment={fetchPayment} fetchReservations={fetchReservations} />
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

  return (
    <div className="bg-white max-w-md mx-auto rounded-xl shadow-xl overflow-hidden border p-4 w-96">

      <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />
      {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}

      {payment && payment.status === "pending" && (
        <div className="flex items-center bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-md p-4 mb-2 space-x-3">
          <MdWarningAmber className="text-2xl mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-semibold">Action Required</p>
            <p className="text-sm">This booking has a payment that needs to be settled.</p>
          </div>
          <button
            type="button"
            className="ml-auto text-sm bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-1.5 rounded transition"
            onClick={() => {
              openModal('read', payment);
            }}
          >
            View
          </button>
        </div>
      )}

      {loading ? (
        <div className="h-64 flex justify-center items-center border space-x-2">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl text-blue-600" />
          <h1>Loading Image...</h1>
        </div>
      ) : error ? (
        <div className="h-64 flex justify-center items-center border text-red-500">
          <p>Error loading room image</p>
        </div>
      ) : (
        <img
          src={room?.room_image ?? defaultImage}
          alt={room?.room_name ?? "Room"}
          className="rounded-md w-full h-64 object-cover"
        />
      )}

      <div className="text-center mt-4">
        <h2 className="font-semibold text-lg tracking-wide mt-1">
          {room?.room_name ?? "Room Name"}
        </h2>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-2 gap-y-2 text-sm px-2">
        <span className="text-gray-600">Guest Name:</span>
        <span className="font-semibold">{booking.user_name}</span>

        <span className="text-gray-600">Status:</span>
        <span
          className={`font-semibold ${booking.status === "confirmed"
            ? "text-green-600"
            : booking.status === "pending"
              ? "text-yellow-600"
              : "text-red-600"
            }`}
        >
          {booking.status}
        </span>

        <span className="text-gray-600">Check-in:</span>
        <span className="font-semibold">{new Date(booking.check_in).toLocaleDateString()}</span>

        <span className="text-gray-600">Check-out:</span>
        <span className="font-semibold">{new Date(booking.check_out).toLocaleDateString()}</span>

        <span className="text-gray-600">Price / Night:</span>
        <span className="font-semibold">₱{Number(booking.price_per_night || 0).toFixed(2)}</span>

        <span className="text-gray-600">Nights:</span>
        <span className="font-semibold">{booking.nights}</span>

        <span className="text-gray-600">Room Subtotal:</span>
        <span className="font-semibold">₱{Number(booking.room_subtotal || 0).toFixed(2)}</span>

        <span className="text-gray-600">Discount:</span>
        <span className="font-semibold text-green-600">-₱{Number(booking.discount || 0).toFixed(2)}</span>

        <span className="text-gray-600">Tax:</span>
        <span className="font-semibold">₱{Number(booking.tax || 0).toFixed(2)}</span>

        <span className="text-gray-600">Booking Subtotal:</span>
        <span className="font-semibold">₱{Number(booking.booking_subtotal || 0).toFixed(2)}</span>
      </div>

      <hr className="my-4" />

      <div className="mt-6 text-center">
        <p className="font-semibold text-gray-600">Final Price</p>
        <p className="text-2xl font-bold text-blue-600">₱{Number(booking.final_price || 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BookingCard;
