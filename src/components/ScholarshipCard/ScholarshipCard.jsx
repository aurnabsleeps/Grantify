import "./ScholarshipCard.css";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="scholarship-card">

      <div className="scholarship-card-top">
        <span>{scholarship.country}</span>
        <span>{scholarship.degree}</span>
      </div>

      <h2>{scholarship.title}</h2>

      <p className="university">
        {scholarship.university}
      </p>

      <div className="scholarship-info">
        <div>
          <small>Scholarship</small>
          <strong>{scholarship.amount}</strong>
        </div>

        <div>
          <small>Deadline</small>
          <strong>{scholarship.deadline}</strong>
        </div>
      </div>

      <button className="view-button">
        View Scholarship
      </button>

    </div>
  );
};

export default ScholarshipCard;