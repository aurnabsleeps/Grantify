import { Routes, Route,Navigate} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
function App(){
return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route path="*"
      element={<Navigate to="/"
        replace />}
/>
      

    </Routes>
  );
}

export default App;

