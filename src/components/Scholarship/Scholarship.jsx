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