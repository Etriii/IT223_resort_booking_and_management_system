// import AdminLayout from "../../layouts/AdminLayout";
import { useEffect } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import BalanceCard from "../../components/Resort_admin/BalanceCard";
const Dashboard = () => {
  const dashboardcard =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4 p-4";
  useEffect(() => {
    
    document.title = "Admin Dashboard | Ocean View";
  }, []);

  return (
    <>
      <div className={`${dashboardcard}`}>
        <DashboardCards title="Today's Profit" value="37" bg="bg-blue-500 col-span-2" timeframe="hidden"/>
        <DashboardCards title="Profit for the Last 30 Days" value="37" bg="bg-green-500 col-span-4" timeframe="hidden"/>
        <DashboardCards title="Total Number of Contributors" value="37" bg="bg-yellow-500 col-span-4" timeframe="hidden"/>       
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Linechart span="xl:col-span-full h-[60lvh]" height="h-[55lvh]"/>
       

      </div>
    </>
  );
};

export default Dashboard;
