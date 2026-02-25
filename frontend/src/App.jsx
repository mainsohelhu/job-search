import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import JobList from "./pages/JobList.jsx";
import JobPost from "./pages/JobPost.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import './App.css';

// Logout ke liye ek alag component taaki useNavigate use kar sakein
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); // Ye "Page Not Found" nahi dega
    window.location.reload(); // State clear karne ke liye
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">🔍 Jobs</Link>
      
      {token && role === "recruiter" && (
        <Link to="/post" className="nav-link">➕ Post Job</Link>
      )}

      {!token ? (
        <>
          <Link to="/login" className="nav-link">🔑 Login</Link>
          <Link to="/signup" className="nav-link">📝 Signup</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
      )}
    </nav>
  );
};

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <div className="container">
        {/* Navbar component router ke andar hai */}
        <Navbar />

        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/post" element={token && role === "recruiter" ? <JobPost /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;