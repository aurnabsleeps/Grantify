import Header from "../Header/Header";
import "./ApplicationTracker.css";


const ApplicationTracker = () => {
  return (
    <div className="tracker-page">

      <Header />

      <h1>Application Tracker</h1>

      <p>
        Track and manage your scholarship applications.
      </p>

      <div className="tracker-stats">

        <div className="stat-card">
          <h3>Applied</h3>
          <strong>3</strong>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <strong>2</strong>
        </div>

        <div className="stat-card">
          <h3>Accepted</h3>
          <strong>1</strong>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <strong>1</strong>
        </div>

      </div>


     <div className="applications">

  <div className="applications-header">
    <h2>My Applications</h2>

    <button className="add-button">
      + Add Application
    </button>
  </div>

        <div className="application-card">

          <div>
            <h3>Global Excellence Scholarship</h3>
            <p>University of Oxford</p>
          </div>

          <span className="status applied">
            Applied
          </span>

        </div>


        <div className="application-card">

          <div>
            <h3>International Student Scholarship</h3>
            <p>University of Toronto</p>
          </div>

          <span className="status pending">
            Pending
          </span>

        </div>


        <div className="application-card">

          <div>
            <h3>Future Leaders Scholarship</h3>
            <p>University of Melbourne</p>
          </div>

          <span className="status accepted">
            Accepted
          </span>

        </div>


        <div className="application-card">

          <div>
            <h3>Academic Achievement Scholarship</h3>
            <p>University of Amsterdam</p>
          </div>

          <span className="status rejected">
            Rejected
          </span>

        </div>

      </div>

    </div>
  );
};

export default ApplicationTracker;