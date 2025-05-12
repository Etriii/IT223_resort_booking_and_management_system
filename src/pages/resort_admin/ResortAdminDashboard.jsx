import { useEffect, useState, useRef } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import BalanceCard from "../../components/Resort_admin/BalanceCard";
import AdminLayout from "../../layouts/ResortAdminLayout";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import RoomsCard from "../../components/Resort_admin/RoomsCard";

const ResortAdminDashboard = () => {
  const containerRef = useRef(null);

  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState([]);
  const [totalRooms, setTotalRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState();

  const dashboardcard =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4";
  useEffect(() => {
    document.title = "Dashboard | Ocean View";
  }, []);

  //table
  useEffect(() => {
    document.title = "Bookings | Ocean View";

    const fetchBookings = async () => {
      try {
        const resort_id = localStorage.getItem("user_role")
          ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
          : null;

        const [bookingsRes, totalBookingsRes, totalRoomsRes] = await Promise.all([
          fetch(
            `http://localhost:8000/api.php?controller=Bookings&action=getBookingsByResortId&resort_id=${resort_id}`
          ),
          fetch(
            `http://localhost:8000/api.php?controller=Bookings&action=getTotalBookingsByResortId&resort_id=${resort_id}`
          ),
          fetch(
            `http://localhost:8000/api.php?controller=Rooms&action=getTotalRoomsByResortId&resort_id=${resort_id}`
          ),
        ]);

        const bookingsData = await bookingsRes.json();
        const totalBookingsData = await totalBookingsRes.json();
        const totalRoomsData = await totalRoomsRes.json();

        setBookings(bookingsData);
        setTotalBookings(totalBookingsData);
        setTotalRooms(totalRoomsData);
      } catch (error) {
        setNotify({
          type: "error",
          message: error.message || "Something went wrong!",
        });
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <div className={`${dashboardcard}`}>
        <DashboardCards title="Arrivals" value="37" bg="bg-green-500" />
        <DashboardCards title="Occupancy" value="37" bg="bg-blue-500" />
        <DashboardCards title="Reservations" value="37" bg="bg-yellow-500" />
        <DashboardCards title="Departures" value="37" bg="bg-red-500" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Linechart height="h-[39lvh]" />
        <div className="flex flex-col col-span-4 gap-4">
          <BalanceCard title="Bookings" value={totalBookings[0]?.Total_Amount ? totalBookings[0].Total_Amount : "0"}/>
          <BalanceCard title="Upcoming Balance" value={totalBookings[0]?.Total_Amount ? totalBookings[0].Total_Amount : "0"}/>
        </div>
        <div className="col-span-8 bg-gray-200 p-1 rounded-lg">
          <div className="hidden md:block overflow-x-hidden">
            <Table
              theadings={[
                "Name",
                "Building Name",
                "Room|Floor No.",
                "Room Type",
                "No. of Nights",
                "Amount",
              ]}
            >
              {bookings && bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <TableData
                    key={booking.id || index}
                    columns={[
                      booking.Name,
                      booking.Building_Name,
                      booking.Floor_Count,
                      booking.Room_Type,
                      booking.No_of_Nights,
                      `₱${booking.Amount?.toLocaleString()}`,
                    ]}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </div>
        <RoomsCard value={totalRooms[0]?.Total_Rooms ? totalRooms[0].Total_Rooms : "0"}/>
      </div>
    </>
  );
};

export default ResortAdminDashboard;
