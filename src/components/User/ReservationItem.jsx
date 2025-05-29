import React from 'react';

const ReservationItem = ({ reservation, handlePayment }) => {
    const statusLabel =
        reservation.payment_submission_status_from_db === 'pending'
            ? 'Awaiting Confirmation'
            : reservation.payment_submission_status_from_db === 'rejected'
                ? 'Payment Rejected'
                : reservation.booking_status;

    const statusClass =
        reservation.payment_submission_status_from_db === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : reservation.payment_submission_status_from_db === 'rejected'
                ? 'bg-red-100 text-red-800'
                : reservation.booking_status === 'Confirmed'
                    ? 'bg-green-100 text-green-800'
                    : reservation.booking_status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800';

    const isDisabled =
        reservation.payment_submission_status_from_db === 'pending' ||
        reservation.booking_status === 'Confirmed' ||
        reservation.booking_status === 'Cancelled';

    const buttonText =
        reservation.payment_submission_status_from_db === 'pending'
            ? 'Awaiting Confirmation'
            : reservation.payment_submission_status_from_db === 'rejected'
                ? 'Payment Rejected - Retry'
                : reservation.booking_status === 'Confirmed'
                    ? 'Paid'
                    : reservation.booking_status === 'Cancelled'
                        ? 'Cancelled'
                        : 'Pay Now';

    const buttonClass = isDisabled
        ? 'bg-gray-300 cursor-not-allowed text-gray-600 px-4 py-2 rounded-md'
        : 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer';

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-4 py-4 text-blue-700 font-bold">#{reservation.booking_id}</td>
            <td className="px-2 py-4">{reservation.room_name}</td>
            <td className="px-4 py-4">{reservation.room_type_name}</td>
            <td className="px-4 py-4">{reservation.check_in}</td>
            <td className="px-4 py-4">{reservation.check_out}</td>
            <td className="px-4 py-4">{reservation.nights}</td>
            <td className="px-4 py-4 font-bold">
                ₱ {Number(reservation.final_price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-4">
                {reservation.booking_created_at
                    ? new Date(reservation.booking_created_at).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })
                    : '-'}
            </td>

            <td className={`px-8 py-4 capitalize rounded-md font-semibold ${statusClass}`}>
                {statusLabel}
            </td>

            <td className="px-8 py-4">
                {buttonText === "Pay Now" ? (
                    <button
                        onClick={() => {
                            console.log('Opening modal with:', reservation);
                            handlePayment(reservation);
                        }}
                        className={buttonClass}
                        disabled={isDisabled}
                    >
                        {buttonText}
                    </button>
                ) : (
                    <span className="text-gray-600">{buttonText}</span>
                )}
            </td>
        </tr>
    );
};

export default ReservationItem;
