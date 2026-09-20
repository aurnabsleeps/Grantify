import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserProfile, updateUserProfile } from "../api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("grantifyLoggedIn");
    const storedUser = localStorage.getItem("grantifyUser");

    if (loggedIn !== "true" || !storedUser) {
      navigate("/student-login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch latest profile from MongoDB
      if (parsedUser && parsedUser.email) {
        getUserProfile(parsedUser.email)
          .then((freshUser) => {
            setUser(freshUser);
            localStorage.setItem("grantifyUser", JSON.stringify(freshUser));
          })
          .catch((err) => {
            console.log("Using cached profile data:", err.message);
          });
      }
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
    setError(false);
  };

  const handleCancel = () => {
    const storedUser = localStorage.getItem("grantifyUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setEditing(false);
    setMessage("");
    setError(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setMessage("");
    setError(false);

    const cgpa = Number(user.cgpa);

    if (user.cgpa !== undefined && user.cgpa !== "" && (cgpa < 0 || cgpa > 4)) {
      setError(true);
      setMessage("CGPA must be between 0 and 4.");
      return;
    }

    setLoading(true);

    try {
      const updatedUser = await updateUserProfile({
        email: user.email,
        name: user.name,
        country: user.country,
        cgpa: user.cgpa,
        degree: user.degree,
        field: user.field,
        institution: user.institution,
        graduationYear: user.graduationYear,
      });

      localStorage.setItem("grantifyUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditing(false);
      setMessage("Profile updated successfully in MongoDB.");
    } catch (err) {
      setError(true);
      setMessage(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("grantifyLoggedIn");
    localStorage.removeItem("grantifyUser");
    localStorage.removeItem("grantifyToken");
    localStorage.removeItem("grantifyRole");
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
                  disabled
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
                  value={user.cgpa !== undefined && user.cgpa !== null ? user.cgpa : ""}
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
                  type="text"
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
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="primary-button profile-button"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
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
            <p className={error ? "message error-message" : "message success-message"}>
              {message}
            </p>
          )}

        </div>
      </main>
    </>
  );
}

export default Profile;
