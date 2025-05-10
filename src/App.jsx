// import { useState, useEffect } from 'react';
// import PageNotFound from './pages/auth/PageNotFound';
// import './App.css'

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import RootLayout from './layouts/RootLayout';

// import HomePage from './pages/ocean_view/HomePage';
// // import { BrowserRouter, Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// // import OceanViewRoutes from "./routes/OceanViewRoutes";


// import AdminLayout from './layouts/AdminLayout';
// import AdminDashboard from './pages/admin/AdminDashboard'

// function App() {
//   // const [count, setCount] = useState(0)
//   // const [status, setStatus] = useState("Checking...");

//   // useEffect(() => {
//   //   //  fetch("http://localhost:8000/connection_db_test.php")
//   //   fetch("http://localhost:8000/api.php?controller=User&action=getAllUsers")
//   //     .then((response) => response.json())
//   //     .then((data) => setStatus(data.message))
//   //     .catch(() => setStatus("Error connecting to database"));
//   // }, []);

//   // useEffect(() => {
//   //   fetch("http://localhost:8000/api.php?controller=User&action=getAllUsers")
//   //     .then((response) => response.json())
//   //     .then((data) => setStatus(JSON.stringify(data))) // Convert to string for debugging
//   //     .catch(() => setStatus("Error fetching data"));
//   // }, []);

//   // const basename = "oceanview";

//   // const router = createBrowserRouter(
//   //   createRoutesFromElements(
//   //     <Route path='oceanview' element={<RootLayout />}>
//   //       <Route path='/' element={<HomePage />} />
//   //       <Route path='*' element={<PageNotFound />} />
//   //     </Route>
//   //   )
//   // );



//   return (
//     // <p>Status: {status}</p>
//     // <Routes>
//     //   {/* <Route exact path="oceanview/*" element={<OceanViewRoutes />} /> */}
//     //   <Route path={`${basename}/`} element={<HomePage />} />
//     //   <Route path="*" element={<PageNotFound />} />
//     // </Routes>
//     // <RouterProvider router={router} />

//     <Router>
//       <Routes>
//         <Route path="oceanview/admin" element={<AdminLayout />}>
//           <Route path="dashboard" element={<AdminDashboard />} />
//         </Route>
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

import './App.css'

import { Routes, Route } from "react-router-dom";

// Layouts
import { AdminLayout, ResortAdminLayout, UserLayout, LoginLayout } from './layouts';

//Admin Page 
import { AdminDashboard, Resorts, Users, AdminMyAccount, AdminActivityLogs, FullScreenMap } from "./pages/admin";

//Resort Admin Page
import { ResortAdminDashboard, ManageResort, Reservations, ManageBuildings, ManageRooms, Events, RAMyAccount, ReportAndAnalytics, ResortActivityLogs, ResortSchedules } from './pages/resort_admin';

// User Page
import { Bookmarks, MyAccount, MyReservations, TransactionsHistory, ResortsList, ResortDetails, ResortRoomList, ResortBuildings } from './pages/user';
import { HomePage, AboutOceanView, TermsAndPrivacy } from './pages/ocean_view';
// import ResortRoomDetails from './pages/user/ResortRoomDetails';
// Auth
import { Login, LoginAs, PageNotFound, Register, Unauthorized } from './pages/auth';

import { Authenticate, ProtectedRoute, RedirectIfAuthenticated } from './utils/middlewares';


const App = () => {
  return (
    <Routes>

      <Route path="oceanview/admin" element={<AdminLayout />}>
        <Route element={<Authenticate />}>
          <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="resorts" element={<Resorts />} />
            <Route path="users" element={<Users />} />
            <Route path="myaccount" element={<AdminMyAccount />} />
            <Route path="activitylogs" element={<AdminActivityLogs />} />
          </Route>
        </Route>
      </Route>

      {/* Mag add og restrictions sa mga resort_admin lang */}
      <Route path="oceanview/resortadmin" element={<ResortAdminLayout />}>
        <Route element={<Authenticate />}>
          <Route element={<ProtectedRoute allowedRoles={['resort_super_admin', 'resort_admin']} />}>
            <Route index element={<ResortAdminDashboard />} />
            <Route path="dashboard" element={<ResortAdminDashboard />} />
            <Route path="manage/resort" element={<ManageResort />} />
            <Route path="manage/buildings" element={<ManageBuildings />} />
            <Route path="manage/rooms/:building_id" element={<ManageRooms />} />
            {/* I think mag add dri og mga incoming reservations */}
            <Route path="reservations" element={<Reservations />} />
            <Route path="schedules" element={<ResortSchedules />} />

            <Route element={<ProtectedRoute allowedRoles={['resort_super_admin']} />}>
              <Route path="events" element={<Events />} />
              <Route path="reportsandanalytics" element={<ReportAndAnalytics />} />
              <Route path="activitylogs" element={<ResortActivityLogs />} />
            </Route>

            <Route path="myaccount" element={<RAMyAccount />} />
          </Route>
        </Route>
      </Route>

      <Route path="oceanview" element={<UserLayout />}>
        <Route element={<ProtectedRoute allowedRoles={['guest']} />}>
          <Route index element={<HomePage />} />
          <Route path="" element={<HomePage />} />
          <Route path="about" element={<AboutOceanView />} />
          <Route path="termsandprivacy" element={<TermsAndPrivacy />} />

          {/* USER */}
          <Route path="resortslist" element={<ResortsList />} />
          <Route path="resortdetails/:id" element={<ResortDetails />} />
          <Route path="resortbuildings/:id" element={<ResortBuildings />} />
          <Route path="resortroomlist/:building_id" element={<ResortRoomList />} />
          {/* <Route path="resortroomdetails/:id" element={<ResortRoomDetails />} /> */}

          <Route element={<Authenticate />}>
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="myaccount" element={<MyAccount />} />
            <Route path="myreservations" element={<MyReservations />} />
            <Route path="transactionshistory" element={<TransactionsHistory />} />
          </Route>
        </Route>
      </Route>

      <Route path="oceanview" element={<LoginLayout />}>
        {/* butangan ni 2 here og check if naka log in naba */}
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
      {/* <Route element={<ProtectedRoute />}>
          <Route path="loginas" element={<LoginAs />} />
        </Route> */}

      {/* Catch-all Route for unauthorized access */}
      <Route path="oceanview/unauthorized" element={<Unauthorized />} />

      {/* Catch-all Route for 404 Page */}
      <Route path="*" element={<PageNotFound />} />
      <Route path='full-map' element={<FullScreenMap />} />
    </Routes>
  );
};

export default App;
