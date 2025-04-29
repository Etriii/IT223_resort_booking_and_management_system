import { useEffect } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import BalanceCard from "../../components/Resort_admin/BalanceCard";
import AdminLayout from "../../layouts/ResortAdminLayout";

const ResortAdminDashboard = () => {
  const dashboardcard = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4";
    useEffect(() => {
        document.title = "Dashboard | Ocean View";
    }, []);
    return (
        <>
      <h1 className="text-5xl text-center">Resort Admin</h1>
      <div className={`${dashboardcard}`}>
      <DashboardCards title ="Arrivals" value ="37" bg="bg-green-500"/><DashboardCards/>
      <DashboardCards title ="Occupancy" value ="37" bg="bg-blue-500"/><DashboardCards/>
      <DashboardCards title ="Reservations" value ="37" bg="bg-yellow-500"/><DashboardCards/>
      <DashboardCards title ="Departures" value ="37" bg="bg-red-500"/><DashboardCards/>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Linechart/>
        <div className="flex flex-col col-span-4 gap-4">

          <BalanceCard title="Bookings"/><BalanceCard/>
          <BalanceCard title="Upcoming Balance"/><BalanceCard/>
        </div>
      </div>
    </>
    );
}

export default ResortAdminDashboard;