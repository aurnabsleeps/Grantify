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
      <Route path="/register" element={<Register />} />

      {/* Student Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Redirect unknown URLs to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
