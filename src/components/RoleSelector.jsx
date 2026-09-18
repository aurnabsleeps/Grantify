import { useNavigate, useLocation } from "react-router-dom";

function RoleSelector() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname.includes("login");

  const handleAdmin = () => {
    navigate(isLogin ? "/admin-login" : "/admin-register");
  };

  const handleStudent = () => {
    navigate(isLogin ? "/student-login" : "/student-register");
  };

  return (
    <div className="role-selector">
      <button
        type="button"
        className="role-option"
        onClick={handleAdmin}
      >
        ADMIN
      </button>

      <button
        type="button"
        className="role-option"
        onClick={handleStudent}
      >
        STUDENT
      </button>
    </div>
  );
}

export default RoleSelector;