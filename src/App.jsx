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
import { AdminDashboard, Resorts, Users, AdminMyAccount } from "./pages/admin";

//Resort Admin Page
import { ResortAdminDashboard, ManageResort, Reservations, ManageBuildings, Events } from './pages/resort_admin';

// User Page
import { Bookmarks, MyAccount, MyReservations, TransactionsHistory } from './pages/user';
import { ResortsList, ResortDetails, ResortRoomList } from './pages/user';
import { HomePage, AboutOceanView, TermsAndPrivacy } from './pages/ocean_view';

// Auth
import { Login, LoginAs, PageNotFound, Register, Unauthorized } from './pages/auth';

import { Authenticate, ProtectedRoute, RedirectIfAuthenticated } from './utils/middlewares';
import RAMyAccount from './pages/resort_admin/RAMyAccount';

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
          </Route>
        </Route>
      </Route>

      <Route path="oceanview/resortadmin" element={<ResortAdminLayout />}>
        <Route element={<Authenticate />}>
          <Route element={<ProtectedRoute allowedRoles={['resort_super_admin', 'resort_admin']} />}>
            <Route index element={<ResortAdminDashboard />} />
            <Route path="dashboard" element={<ResortAdminDashboard />} />
            <Route path="manage/resort" element={<ManageResort />} />
            <Route path="manage/buildings" element={<ManageBuildings />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="myaccount" element={<RAMyAccount />} />
            <Route path="events" element={<Events />} />
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
          <Route path="resortdetails" element={<ResortDetails />} />
          <Route path="resortroomlist" element={<ResortRoomList />} />

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
    </Routes>
  );
};

export default App;
