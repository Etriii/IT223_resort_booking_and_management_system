import { useEffect } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import BalanceCard from "../../components/Resort_admin/BalanceCard";
import AdminLayout from "../../layouts/ResortAdminLayout";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";

const ResortAdminDashboard = () => {
  const dashboardcard =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4";
  useEffect(() => {
    document.title = "Dashboard | Ocean View";
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
        <Table theadings={["Name", "Building No.", "Floo|Room No.", "Room Type", "No. of Nights","Payment Type","Amount"]}>

        </Table>
      </div>
    </>
  );
};

export default ResortAdminDashboard;
