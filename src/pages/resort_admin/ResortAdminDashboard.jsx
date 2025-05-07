import { useEffect,useState,useRef } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import BalanceCard from "../../components/Resort_admin/BalanceCard";
import AdminLayout from "../../layouts/ResortAdminLayout";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import RoomsCard from "../../components/Resort_admin/RoomsCard";

const ResortAdminDashboard = () => {
  const containerRef = useRef(null);

    const [buildings, setBuildings] = useState();
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState();

  const dashboardcard =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4";
  useEffect(() => {
    document.title = "Dashboard | Ocean View";
  }, []);

  //table
  useEffect(() => {
      document.title = "Buildings | Ocean View";
      const fetchBuildings = async () => {
        try {
          const resort_id = localStorage.getItem("user_role")
            ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
            : null;
  
          const response = await fetch(
            `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
          );
  
          const data = await response.json();
          setBuildings(data);
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
  
      fetchBuildings();
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
        <Linechart height="h-[39lvh]"/>
        <div className="flex flex-col col-span-4 gap-4">
          <BalanceCard title="Bookings" />
          <BalanceCard title="Upcoming Balance"/>
        </div>
        <div className="col-span-8 bg-gray-200 p-1 rounded-lg">
          <h1 className="text-2xl font-semibold p-2 tracking-wide">Latest Bookings</h1>
        <Table theadings={["Name", "Building Name", "Floor|Room No.", "Room Type", "No. of Nights","Payment Type","Amount"]}>
        {buildings && buildings.length > 0 ? (
          buildings.map((building, index) => (
            <TableData 
            key={buildings.id || index}
              columns={[
                building.id,
                building.name,
                `${building.floor_count} | ${building.room_per_floor} `,
              ]}
            />
          ))):(
            <tr></tr>
          )}
        
        </Table>
        </div>
        <RoomsCard/>
      </div>
    </>
  );
};

export default ResortAdminDashboard;
