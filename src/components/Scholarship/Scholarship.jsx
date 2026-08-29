import Header from "../Header/Header";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import scholarships from "../../data/scholarships";
import "./Scholarship.css";

const Scholarship = () => {
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
        />

        <select>
          <option>All Countries</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>Netherlands</option>
        </select>

        <select>
          <option>All Degrees</option>
          <option>Bachelor's</option>
          <option>Master's</option>
          <option>PhD</option>
        </select>

      </section>


      {/* Scholarship Cards */}

      <section className="scholarship-list">

        {scholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
          />
        ))}

      </section>

    </div>
  );
};

export default Scholarship;