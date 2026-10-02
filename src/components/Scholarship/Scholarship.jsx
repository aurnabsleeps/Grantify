import { useEffect, useState } from "react";
import Header from "../Header/Header";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import { getScholarships } from "../../api";
import "./Scholarship.css";

const Scholarship = () => {
  const [scholarshipList, setScholarshipList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [degree, setDegree] = useState("All Degrees");

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [appliedScholarships, setAppliedScholarships] = useState([]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const data = await getScholarships({ search, country, degree });
      setScholarshipList(data);
    } catch (err) {
      console.error("Failed to load scholarships:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [search, country, degree]);

  const handleViewScholarship = (scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const handleCloseModal = () => {
    setSelectedScholarship(null);
  };

  const handleApply = () => {
    if (!selectedScholarship) {
      return;
    }

    const scholarshipId =
      selectedScholarship._id || selectedScholarship.id;

    setAppliedScholarships((previous) => {
      if (previous.includes(scholarshipId)) {
        return previous;
      }

      return [...previous, scholarshipId];
    });
  };

  const isApplied = selectedScholarship
    ? appliedScholarships.includes(
        selectedScholarship._id || selectedScholarship.id
      )
    : false;

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
            <button
              type="button"
              className="scholarship-modal-close"
              onClick={handleCloseModal}
            >
              ×
            </button>

            <h2>{selectedScholarship.title}</h2>

            <p className="modal-university">
              {selectedScholarship.university}
            </p>

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

            <button
              type="button"
              className={
                isApplied
                  ? "modal-apply-button applied"
                  : "modal-apply-button"
              }
              onClick={handleApply}
              disabled={isApplied}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarship;