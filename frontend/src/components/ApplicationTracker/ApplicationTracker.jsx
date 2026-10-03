import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { getStudentApplications } from "../../api";
import "./ApplicationTracker.css";

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    applied: 0,
    accepted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUserRaw = localStorage.getItem("grantifyUser");
  const currentUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

  const loadStudentData = async () => {
    if (!currentUser || !currentUser.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getStudentApplications(currentUser.email);
      setApplications(res.applications || []);
      setStats(
        res.stats || {
          applied: 0,
          accepted: 0,
          rejected: 0,
        }
      );
      setError("");
    } catch (err) {
      console.error("Error loading application tracker:", err.message);
      setError(err.message || "Failed to load application tracker data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentData();
  }, []);

  return (
    <div className="tracker-page">
      <Header />

      <h1>Application Tracker</h1>

      <p>Track and manage your scholarship applications in real-time.</p>

      {/* Tracker Stats: Applied, Accepted, Rejected */}
      <div className="tracker-stats">
        <div className="stat-card">
          <h3>Applied</h3>
          <strong>{stats.applied}</strong>
        </div>

        <div className="stat-card">
          <h3>Accepted</h3>
          <strong>{stats.accepted}</strong>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <strong>{stats.rejected}</strong>
        </div>
      </div>

      <div className="applications">
        <div className="applications-header">
          <h2>My Applications</h2>
        </div>

        {loading && (
          <p style={{ textAlign: "center", color: "#666", padding: "2rem" }}>
            Loading applications from MongoDB...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", color: "#d9534f", padding: "2rem" }}>
            {error}
          </p>
        )}

        {!loading && !error && applications.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem", background: "white", borderRadius: "12px", border: "1px solid #ddd" }}>
            <p style={{ color: "#666", fontSize: "16px", marginBottom: "1rem" }}>
              You haven't applied for any scholarships yet.
            </p>
            <p style={{ color: "#888", fontSize: "14px" }}>
              Explore the <strong>Scholarships</strong> tab and click <strong>Apply</strong> to get started!
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          applications.map((app) => (
            <div className="application-card" key={app._id}>
              <div>
                <h3>{app.scholarshipTitle}</h3>
                <p>{app.university}</p>
                {app.country && (
                  <small style={{ color: "#999" }}>
                    {app.country} • {app.degree}
                  </small>
                )}
              </div>

              <span className={`status ${app.status}`}>
                {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Applied"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;