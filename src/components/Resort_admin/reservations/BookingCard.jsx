// import React from "react";

// const BookingCard = ({ booking }) => {
//     const {
//         booking_id,
//         user_name,
//         room_id,
//         check_in,
//         check_out,
//         booking_subtotal,
//         total_amount,
//         status,
//         price_per_night,
//         nights,
//         room_subtotal,
//         discount,
//         tax,
//         final_price,
//         resort_id,
//         created_at,
//         room_image,
//     } = booking;

//     const defaultImage = "https://via.placeholder.com/600x400?text=Room+Image";

//     const labelClass = "text-gray-500 font-medium";
//     const valueClass = "text-gray-800";

//     const DetailRow = ({ label, value }) => (
//         <div className="grid grid-cols-2 py-1">
//             <span className={labelClass}>{label}</span>
//             <span className={valueClass}>{value}</span>
//         </div>
//     );

//     return (
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl mx-auto my-6 border">
//             <img
//                 src={room_image || defaultImage}
//                 alt="Room"
//                 className="w-full h-64 object-cover"
//             />

//             <div className="p-6">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                     Booking #{booking_id}
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <DetailRow label="User Name" value={user_name} />
//                     <DetailRow label="Room ID" value={room_id} />
//                     <DetailRow label="Check In" value={check_in} />
//                     <DetailRow label="Check Out" value={check_out} />
//                     <DetailRow label="Price/Night" value={`₱${price_per_night}`} />
//                     <DetailRow label="Nights" value={nights} />
//                     <DetailRow label="Room Subtotal" value={`₱${room_subtotal}`} />
//                     <DetailRow label="Booking Subtotal" value={`₱${booking_subtotal}`} />
//                     <DetailRow label="Discount" value={`₱${discount}`} />
//                     <DetailRow label="Tax" value={`₱${tax}`} />
//                     <DetailRow label="Final Price" value={`₱${final_price}`} />
//                     <DetailRow label="Total Amount" value={`₱${total_amount}`} />
//                     <DetailRow label="Status" value={status} />
//                     <DetailRow label="Resort ID" value={resort_id} />
//                     <DetailRow label="Created At" value={new Date(created_at).toLocaleString()} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingCard;


import React from "react";

import { useFetchRoomById } from "../../../hooks";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ElegantBookingCard = ({ booking }) => {
  // const {
  //   floor = "1",
  //   room_number = "10",
  //   resort_name = "PUNTA VERDE",
  //   guests = 3,
  //   room_type = "Kings Size Bed",
  //   check_in = "December 13, 2024",
  //   check_out = "December 20, 2024",
  //   total_price = 74054.5,
  //   image_url = "",
  // } = booking;

  const defaultImage = "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";

  const { room, setRoom, loading, error, setError, fetchRoom } = useFetchRoomById(booking.room_id);

  return (
    <div className="bg-white max-w-md mx-auto rounded-xl shadow-xl overflow-hidden border p-4 w-96">
      {
        loading ?
          <div className={`h-64 flex justify-center items-center border space-x-2`}>
            <AiOutlineLoading3Quarters className=" animate-spin font-bold" /><h1>  'Loading Image...'</h1>
          </div>
          :
          <img
            src={room.room_image ?? defaultImage}
            alt="Room"
            className="rounded-md w-full h-64 object-cover"
          />
      }

      {/* {room && JSON.stringify(room)} */}

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Floor - Room</p>
        <h2 className="font-semibold text-lg tracking-wide mt-1">resor name</h2>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-2 gap-y-2 text-sm px-2">
        <span className="text-gray-600">Guests:</span>
        <span className="font-semibold">{3}</span>

        <span className="text-gray-600">Room Type:</span>
        <span className="font-semibold">{1}</span>

        <span className="text-gray-600">Check-in:</span>
        <span className="font-semibold">{1}</span>

        <span className="text-gray-600">Check-out:</span>
        <span className="font-semibold">{2}</span>
      </div>

      <hr className="my-4" />

      <div className="mt-6 text-center">
        <p className="font-semibold text-gray-600">Total</p>
        <p className="text-2xl font-bold text-blue-600">₱{21}</p>
      </div>
    </div>
  );
};

export default ElegantBookingCard;
