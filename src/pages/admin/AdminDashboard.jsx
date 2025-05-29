// import AdminLayout from "../../layouts/AdminLayout";
import { useEffect,useState } from "react";
import DashboardCards from "../../components/Resort_admin/dashboardCard";
import Linechart from "../../components/Resort_admin/LineChart";
import ResortRankingCard from "../../components/Main_admin/ResortRankingCard";
import RecentProfitCard from "../../components/Main_admin/RecentProfitCard";



const Dashboard = () => {
    const [profitMonthly, setProfitMonthly] = useState([]);
    const [profit30Days, setProfit30Days] = useState([]);


  const dashboardcard =
    "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-10 md:grid-cols-10 gap-4 p-4 bg-gray-100";
  useEffect(() => {
    
    document.title = "Admin Dashboard | Ocean View";
  }, []);

   useEffect(() => {
    const fetchProfitData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api.php?controller=Bookings&action=getAllBookingsTotal&resort_id=${resort_id}`
        );
        const data = await res.json();

        const monthlyMap = {};
        data.forEach((booking) => {
          const date = new Date(booking.check_in);
          const month = date.toLocaleDateString("en-US", { month: "short" });
          monthlyMap[month] = (monthlyMap[month] || 0) + parseFloat(booking.total_amount);
        });

        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = allMonths.map((month) => ({
          label: month,
          cost: monthlyMap[month] || 0,
        }));
        setProfitMonthly(monthlyData);

        const dailyMap = {};
        data.forEach((booking) => {
          const date = new Date(booking.check_in);
          const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          dailyMap[label] = (dailyMap[label] || 0) + parseFloat(booking.total_amount);
        });

        const today = new Date();
        const last30Days = [...Array(30).keys()].map((i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (29 - i));
          const label = d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          return {
            label,
            cost: dailyMap[label] || 0,
          };
        });

        setProfit30Days(last30Days);
      } catch (err) {
        console.error(err);
      }
    };
fetchProfitData();
  },[]);
  return (
    <>
      <div className={`${dashboardcard}`}>
        <DashboardCards title="Today's Profit" value="37" bg="bg-blue-500 md:col-span-3 sm:col-span-1 lg:col-span-2" timeframe="hidden"/>
        <DashboardCards title="Profit for the Last 30 Days" value="37" bg="bg-green-500 md:col-span-4 sm:col-span-1 lg:col-span-4" timeframe="hidden"/>
        <DashboardCards title="Total Number of Contributors" value="37" bg="bg-yellow-500 md:col-span-3 sm:col-span-1 lg:col-span-4" timeframe="hidden"/>       
      </div>
      <div className="grid lg:grid-cols-12 sm:grid-cols-4 md:grid-cols-8 space-y-10 gap-5 p-4 bg-gray-100">
        <Linechart span="col-span-full h-[60lvh]" height="h-[55lvh]" monthlyData={profitMonthly} dailyData={profit30Days}/>
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
