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

// Helper component for Student page access
function ProtectedStudentRoute({ children }) {
  const isLoggedIn = localStorage.getItem("grantifyLoggedIn") === "true";
  const role = localStorage.getItem("grantifyRole");

  if (!isLoggedIn || role !== "student") {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Helper component for Admin page access
function ProtectedAdminRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("grantifyLoggedIn") === "true" ||
    localStorage.getItem("grantifyAdminLoggedIn") === "true";
  const role =
    localStorage.getItem("grantifyRole") ||
    (localStorage.getItem("grantifyAdminLoggedIn") === "true" ? "admin" : null);

  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      {/* Guest Page (Public Homepage) */}
      <Route path="/" element={<Home />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-login" element={<StudentLogin />} />

      <Route path="/register" element={<Register />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/student-register" element={<StudentRegister />} />

      {/* Student Only Pages */}
      <Route
        path="/scholarships"
        element={
          <ProtectedStudentRoute>
            <Scholarship />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/applications"
        element={
          <ProtectedStudentRoute>
            <ApplicationTracker />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedStudentRoute>
            <Profile />
          </ProtectedStudentRoute>
        }
      />

      {/* Admin Only Pages */}
      <Route
        path="/adminanalytics"
        element={
          <ProtectedAdminRoute>
            <AdminAnalytics />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admindatamanagement"
        element={
          <ProtectedAdminRoute>
            <AdminDataManagement />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/adminusermanagement"
        element={
          <ProtectedAdminRoute>
            <AdminUserManagement />
          </ProtectedAdminRoute>
        }
      />

      {/* Redirect unknown URLs to Guest Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;