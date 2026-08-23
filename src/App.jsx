import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Scholarship from "./components/Scholarship/Scholarship";
import ApplicationTracker from "./components/ApplicationTracker/ApplicationTracker";
import AdminAnalytics from "./AdminAnalytics";
import AdminDataManagement from "./AdminDataManagement";
import AdminUserManagement from "./AdminUserManagement";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scholarships" element={<Scholarship />} />
      <Route path="/applications" element={<ApplicationTracker />} />

      <Route path="/adminanalytics" element={<AdminAnalytics />} />
      <Route path="/admindatamanagement" element={<AdminDataManagement />} />
      <Route path="/adminusermanagement" element={<AdminUserManagement />} />
    </Routes>
  );
};

export default App;