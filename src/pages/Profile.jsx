import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("grantifyLoggedIn") === "true";

    const storedUser =
      localStorage.getItem("grantifyUser");

    if (!loggedIn || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      cgpa: Number(user.cgpa)
    };

    localStorage.setItem(
      "grantifyUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setEditing(false);
    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">

        <div className="profile-container">

          <section className="profile-header">

            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <span className="student-badge">
                Student
              </span>
            </div>

          </section>

          {message && (
            <div className="profile-success">
              {message}
            </div>
          )}

          <form onSubmit={handleSave}>

            <section className="profile-section">

              <div className="section-heading">
                <div>
                  <h2>Personal Information</h2>
                  <p>
                    Your basic account information.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                  />
                </div>

              </div>

            </section>

            <section className="profile-section">

              <div className="section-heading">
                <div>
                  <h2>Academic Information</h2>
                  <p>
                    Your scholarship matching criteria.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>CGPA</label>

                  <input
                    type="number"
                    name="cgpa"
                    min="0"
                    max="4"
                    step="0.01"
                    value={user.cgpa}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>

                  <select
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                    disabled={!editing}
                  >
                    <option value="Bangladesh">
                      Bangladesh
                    </option>
                    <option value="India">
                      India
                    </option>
                    <option value="Pakistan">
                      Pakistan
                    </option>
                    <option value="United States">
                      United States
                    </option>
                    <option value="United Kingdom">
                      United Kingdom
                    </option>
                    <option value="Canada">
                      Canada
                    </option>
                    <option value="Australia">
                      Australia
                    </option>
                    <option value="Germany">
                      Germany
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target Degree</label>

                  <select
                    name="degree"
                    value={user.degree}
                    onChange={handleChange}
                    disabled={!editing}
                  >
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

                  <select
                    name="field"
                    value={user.field}
                    onChange={handleChange}
                    disabled={!editing}
                  >
                    <option value="Computer Science">
                      Computer Science
                    </option>
                    <option value="Engineering">
                      Engineering
                    </option>
                    <option value="Business">
                      Business
                    </option>
                    <option value="Medicine">
                      Medicine
                    </option>
                    <option value="Law">
                      Law
                    </option>
                    <option value="Science">
                      Science
                    </option>
                    <option value="Arts">
                      Arts
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

              </div>

            </section>

            <section className="profile-section">

              <div className="section-heading">
                <div>
                  <h2>Academic Credentials</h2>
                  <p>
                    Your educational background.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Institution</label>

                  <input
                    type="text"
                    name="institution"
                    value={user.institution}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Expected Graduation Year
                  </label>

                  <input
                    type="number"
                    name="graduationYear"
                    value={user.graduationYear}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

              </div>

            </section>

            <div className="profile-actions">

              {!editing ? (
                <button
                  type="button"
                  className="primary-button profile-button"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="primary-button"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>

          </form>

        </div>

      </main>
    </>
  );
}

export default Profile;
