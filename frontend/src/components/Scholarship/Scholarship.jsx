import { useEffect, useState } from "react";
import Header from "../Header/Header";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import { getScholarships, applyForScholarship, getStudentApplications } from "../../api";
import "./Scholarship.css";

const Scholarship = () => {
  const [scholarshipList, setScholarshipList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [degree, setDegree] = useState("All Degrees");

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [appliedIds, setAppliedIds] = useState([]);
  const [applyMessage, setApplyMessage] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);

  // Get current logged-in user
  const storedUserRaw = localStorage.getItem("grantifyUser");
  const currentUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const data = await getScholarships({
        search,
        country,
        degree,
      });
      setScholarshipList(data);
    } catch (err) {
      console.error("Failed to load scholarships:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    if (!currentUser || !currentUser.email) return;
    try {
      const res = await getStudentApplications(currentUser.email);
      if (res && res.applications) {
        const ids = res.applications.map((app) => String(app.scholarshipId));
        setAppliedIds(ids);
      }
    } catch (err) {
      console.error("Failed to fetch student applications:", err.message);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [search, country, degree]);

  useEffect(() => {
    fetchUserApplications();
  }, []);

  // Open scholarship details modal
  const handleViewScholarship = (scholarship) => {
    setSelectedScholarship(scholarship);
    setApplyMessage("");
  };

  // Close scholarship details modal
  const handleCloseModal = () => {
    setSelectedScholarship(null);
    setApplyMessage("");
  };

  // Apply to a scholarship
  const handleApply = async () => {
    if (!selectedScholarship) return;
    if (!currentUser || !currentUser.email) {
      setApplyMessage("Please log in as a student to apply.");
      return;
    }

    const sId = String(selectedScholarship._id || selectedScholarship.id);

    try {
      setApplyLoading(true);
      setApplyMessage("");

      await applyForScholarship({
        studentEmail: currentUser.email,
        studentName: currentUser.name || "Student",
        scholarshipId: sId,
        scholarshipTitle: selectedScholarship.title,
        university: selectedScholarship.university,
        country: selectedScholarship.country,
        degree: selectedScholarship.degree,
      });

      setAppliedIds((prev) => [...prev, sId]);
      setApplyMessage("Application submitted successfully!");
    } catch (err) {
      setApplyMessage(err.message || "Failed to submit application.");
    } finally {
      setApplyLoading(false);
    }
  };

  const currentSelectedId = selectedScholarship
    ? String(selectedScholarship._id || selectedScholarship.id)
    : "";
  const isApplied = appliedIds.includes(currentSelectedId);

  return (
    <div className="scholarship-page">
      <Header />

      <section className="scholarship-hero">
        <h1>Find Your Scholarship</h1>

        <p>
          Discover scholarships and funding opportunities
          that can help you achieve your educational goals.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="scholarship-filters">
        <input
          type="text"
          placeholder="Search scholarships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="All Countries">All Countries</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Netherlands">Netherlands</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
        </select>

        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        >
          <option value="All Degrees">All Degrees</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </section>

      {/* Scholarship Cards */}
      <section className="scholarship-list">
        {loading && (
          <p style={{ textAlign: "center", color: "#666" }}>
            Loading scholarships from MongoDB...
          </p>
        )}

        {!loading && scholarshipList.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>
            No matching scholarships found.
          </p>
        )}

        {!loading &&
          scholarshipList.map((scholarship) => (
            <ScholarshipCard
              key={scholarship._id || scholarship.id}
              scholarship={scholarship}
              onView={handleViewScholarship}
            />
          ))}
      </section>

      {/* Scholarship Details Modal */}
      {selectedScholarship && (
        <div
          className="scholarship-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="scholarship-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="scholarship-modal-close"
              onClick={handleCloseModal}
            >
              ×
            </button>

            {/* Scholarship Title */}
            <h2>{selectedScholarship.title}</h2>

            {/* University */}
            <p className="modal-university">
              {selectedScholarship.university}
            </p>

            {/* Scholarship Information */}
            <div className="modal-details">
              <div>
                <span>Country</span>
                <strong>{selectedScholarship.country}</strong>
              </div>

              <div>
                <span>Degree</span>
                <strong>{selectedScholarship.degree}</strong>
              </div>

              <div>
                <span>Scholarship</span>
                <strong>{selectedScholarship.amount}</strong>
              </div>

              <div>
                <span>Deadline</span>
                <strong>{selectedScholarship.deadline}</strong>
              </div>
            </div>

            {/* Apply Button */}
            <button
              type="button"
              className={
                isApplied
                  ? "modal-apply-button applied"
                  : "modal-apply-button"
              }
              onClick={handleApply}
              disabled={isApplied || applyLoading}
            >
              {isApplied ? "Applied" : applyLoading ? "Submitting..." : "Apply"}
            </button>

            {applyMessage && (
              <p style={{ marginTop: "1rem", textAlign: "center", fontWeight: "bold", color: isApplied ? "#28a745" : "#d9534f" }}>
                {applyMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarship;