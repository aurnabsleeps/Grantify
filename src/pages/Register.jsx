import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cgpa: "",
    country: "",
    degree: "",
    field: "",
    institution: "",
    graduationYear: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError(false);

    const cgpa = Number(formData.cgpa);

    if (cgpa < 0 || cgpa > 4 || Number.isNaN(cgpa)) {
      setError(true);
      setMessage("CGPA must be between 0.00 and 4.00.");
      return;
    }

    if (formData.password.length < 6) {
      setError(true);
      setMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      cgpa: cgpa,
      country: formData.country,
      degree: formData.degree,
      field: formData.field,
      institution: formData.institution,
      graduationYear: formData.graduationYear
    };

    localStorage.setItem(
      "grantifyUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "grantifyLoggedIn",
      "true"
    );

    setMessage(
      "Registration successful! Redirecting..."
    );

    setTimeout(() => {
      navigate("/profile");
    }, 800);
  };

  return (
    <>
      <Navbar />

      <main className="register-page">
        <div className="register-card">

          <div className="auth-icon">🎓</div>

          <h1>Create Your Grantify Account</h1>

          <p className="auth-subtitle">
            Create your student profile and discover
            scholarships that match your academic
            background.
          </p>

          <form onSubmit={handleSubmit}>

            <h2 className="section-title">
              Personal Information
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <h2 className="section-title">
              Academic Information
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>CGPA</label>

                <input
                  type="number"
                  name="cgpa"
                  min="0"
                  max="4"
                  step="0.01"
                  placeholder="Example: 3.75"
                  value={formData.cgpa}
                  onChange={handleChange}
                  required
                />

                <small>
                  Enter CGPA on a 4.00 scale.
                </small>
              </div>

              <div className="form-group">
                <label>Country</label>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Country
                  </option>
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
                <label>Target Degree Level</label>

                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Degree
                  </option>
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
                  value={formData.field}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Field
                  </option>
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

            <h2 className="section-title">
              Academic Credentials
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Institution</label>

                <input
                  type="text"
                  name="institution"
                  placeholder="University / Institution"
                  value={formData.institution}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Expected Graduation Year
                </label>

                <input
                  type="number"
                  name="graduationYear"
                  placeholder="Example: 2028"
                  value={formData.graduationYear}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="terms">
              <label className="checkbox-label">
                <input type="checkbox" required />

                <span>
                  I agree to the Grantify Terms &
                  Conditions and Privacy Policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="primary-button"
            >
              Create Grantify Account
            </button>

          </form>

          {message && (
            <p
              className={
                error
                  ? "message error-message"
                  : "message success-message"
              }
            >
              {message}
            </p>
          )}

          <p className="auth-footer">
            Already have an account?

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default Register;
