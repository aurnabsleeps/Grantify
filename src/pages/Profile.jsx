import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("grantifyLoggedIn");
    const storedUser = localStorage.getItem("grantifyUser");

    if (loggedIn !== "true" || !storedUser) {
      navigate("/student-login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      localStorage.removeItem("grantifyUser");
      localStorage.removeItem("grantifyLoggedIn");
      navigate("/student-login");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value
    }));

    setMessage("");
  };

  const handleEdit = () => {
    setEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    const storedUser = localStorage.getItem("grantifyUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setEditing(false);
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const cgpa = Number(user.cgpa);

    if (user.cgpa !== "" && (cgpa < 0 || cgpa > 4)) {
      setMessage("CGPA must be between 0 and 4.");
      return;
    }

    localStorage.setItem("grantifyUser", JSON.stringify(user));

    setEditing(false);
    setMessage("Profile updated successfully.");
  };

  const handleLogout = () => {
    localStorage.removeItem("grantifyLoggedIn");
    navigate("/");
  };

  const handleExit = () => {
    localStorage.removeItem("grantifyLoggedIn");
    navigate("/student-login");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-card">

          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
          </div>

          {/* Personal Information */}
          <section className="profile-section">
            <h2>Personal Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={user.name || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Country</label>

                <input
                  type="text"
                  name="country"
                  value={user.country || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

            </div>
          </section>

          {/* Academic Information */}
          <section className="profile-section">
            <h2>Academic Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>CGPA</label>

                <input
                  type="number"
                  name="cgpa"
                  min="0"
                  max="4"
                  step="0.01"
                  value={user.cgpa || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Target Degree</label>

                <select
                  name="degree"
                  value={user.degree || ""}
                  onChange={handleChange}
                  disabled={!editing}
                >
                  <option value="">Select Degree</option>
                  <option value="Undergraduate">
                    Undergraduate
                  </option>
                  <option value="Masters">
                    Masters
                  </option>
                  <option value="PhD">
                    PhD
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Field of Study</label>

                <input
                  type="text"
                  name="field"
                  value={user.field || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

            </div>
          </section>

          {/* Academic Credentials */}
          <section className="profile-section">
            <h2>Academic Credentials</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Institution</label>

                <input
                  type="text"
                  name="institution"
                  value={user.institution || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Graduation Year</label>

                <input
                  type="number"
                  name="graduationYear"
                  value={user.graduationYear || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

            </div>
          </section>

          {/* Bottom Action Area */}
          <div className="profile-bottom-actions">

            {/* Left Side */}
            <div className="profile-left-actions">
              {!editing ? (
                <button
                  type="button"
                  className="primary-button profile-button"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="primary-button profile-button"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>

            {/* Right Side */}
            <div className="profile-right-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={handleExit}
              >
                Exit
              </button>

            </div>

          </div>

          {/* Message */}
          {message && (
            <p className="message success-message">
              {message}
            </p>
          )}

        </div>
      </main>
    </>
  );
}

export default Profile;
