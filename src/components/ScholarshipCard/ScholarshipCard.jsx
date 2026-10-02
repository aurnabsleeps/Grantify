import "./ScholarshipCard.css";

const ScholarshipCard = ({ scholarship, onView }) => {
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

      <button
        type="button"
        className="view-button"
        onClick={() => onView(scholarship)}
      >
        View Scholarship
      </button>

    </div>
  );
};

export default ScholarshipCard;