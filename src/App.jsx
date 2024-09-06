import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from "./pages/auth/LandingPage";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/dashboard/User";
import Credit from "./pages/dashboard/Credit";
import UserDetailsPage from "./pages/dashboard/UserDetailsPage";
import Notification from "./pages/dashboard/Notification";
import Payment from "./pages/dashboard/Payment";
import Feedback from "./pages/dashboard/Feedback";
import Cutlist from "./pages/dashboard/Cutlist";
import ScrollTop from "./components/top/ScrollTop";


function App() {
  

  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} ></Route>
          <Route path="/users" element={<User />} ></Route>
          <Route path="/user/:userId" element={<UserDetailsPage />} />
          <Route path="/credit-packages" element={<Credit />} ></Route>
          <Route path="/notification" element={<Notification />} ></Route>
          <Route path="/payment" element={<Payment />} ></Route>
          <Route path="/feedback" element={<Feedback />} ></Route>
          <Route path="/cutlist" element={<Cutlist />} ></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
