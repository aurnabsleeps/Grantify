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

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="All Countries">All Countries</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Netherlands">Netherlands</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
        </select>

        <select value={degree} onChange={(e) => setDegree(e.target.value)}>
          <option value="All Degrees">All Degrees</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </section>

      {/* Scholarship Cards */}
      <section className="scholarship-list">
        {loading && <p style={{ textAlign: "center", color: "#666" }}>Loading scholarships from MongoDB...</p>}

        {!loading && scholarshipList.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>No matching scholarships found.</p>
        )}

        {!loading &&
          scholarshipList.map((scholarship) => (
            <ScholarshipCard
              key={scholarship._id || scholarship.id}
              scholarship={scholarship}
            />
          ))}
      </section>
    </div>
  );
};

export default Scholarship;