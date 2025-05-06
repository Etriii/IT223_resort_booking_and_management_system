// import AdminLayout from "../../layouts/AdminLayout";
import { useEffect } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import ResortRankingCard from "../../components/Main_admin/ResortRankingCard";
import RecentProfitCard from "../../components/Main_admin/RecentProfitCard";

const Dashboard = () => {
  const dashboardcard =
    "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-10 md:grid-cols-10 gap-4 p-4 bg-gray-200";
  useEffect(() => {
    
    document.title = "Admin Dashboard | Ocean View";
  }, []);

  return (
    <>
      <div className={`${dashboardcard}`}>
        <DashboardCards title="Today's Profit" value="37" bg="bg-blue-500 md:col-span-3 sm:col-span-1 lg:col-span-2" timeframe="hidden"/>
        <DashboardCards title="Profit for the Last 30 Days" value="37" bg="bg-green-500 md:col-span-4 sm:col-span-1 lg:col-span-4" timeframe="hidden"/>
        <DashboardCards title="Total Number of Contributors" value="37" bg="bg-yellow-500 md:col-span-3 sm:col-span-1 lg:col-span-4" timeframe="hidden"/>       
      </div>
      <div className="grid lg:grid-cols-12 sm:grid-cols-4 md:grid-cols-8 space-y-10 gap-5 p-4 bg-gray-200">
        <Linechart span="col-span-full h-[60lvh]" height="h-[55lvh]"/>
        <div className="lg:col-span-5 md:col-span-full sm:col-span-full">
        <ResortRankingCard/>
        </div>
        <div className="lg:col-span-7 md:col-span-full sm:col-span-full">
        <RecentProfitCard/>
        </div>


      </div>
    </>
  );
};

export default Dashboard;
