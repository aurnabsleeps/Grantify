import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Scholarship from "./components/Scholarship/Scholarship";
import ApplicationTracker from "./components/ApplicationTracker/ApplicationTracker";

import AdminAnalytics from "./AdminAnalytics";
import AdminDataManagement from "./AdminDataManagement";
import AdminUserManagement from "./AdminUserManagement";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import AdminRegister from "./pages/AdminRegister";
import StudentRegister from "./pages/StudentRegister";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<Home />} />

      {/* Scholarship Features */}
      <Route path="/scholarships" element={<Scholarship />} />
      <Route path="/applications" element={<ApplicationTracker />} />

      {/* Admin Pages */}
      <Route path="/adminanalytics" element={<AdminAnalytics />} />
      <Route
        path="/admindatamanagement"
        element={<AdminDataManagement />}
      />
      <Route
        path="/adminusermanagement"
        element={<AdminUserManagement />}
      />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-login" element={<StudentLogin />} />

      <Route path="/register" element={<Register />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/student-register" element={<StudentRegister />} />

      {/* Student Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Redirect unknown URLs to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;