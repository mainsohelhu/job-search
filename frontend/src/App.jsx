import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import JobList from "./pages/JobList.jsx";
import JobPost from "./pages/JobPost.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import './App.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Brand Section */}
      <div className="nav-brand">
          <span className="logo-text">Jobify</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-menu">
        <Link to="/" className="nav-link"> Jobs</Link>
        {token && role === "recruiter" && (
          <Link to="/post" className="nav-link"> Post Job</Link>
        )}
      </div>

      {/* User Info & Auth Section */}
      <div className="nav-auth">
        {!token ? (
          <div className="auth-buttons">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="signup-btn">Join Now</Link>
          </div>
        ) : (
          <div className="user-profile-nav">
            <div className="user-info">
              <span className="user-status-dot"></span>
              <span className="user-role">{role}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Navbar />
      <div className="container" style={{ marginTop: '90px' }}>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route 
            path="/post" 
            element={token && role === "recruiter" ? <JobPost /> : <Login />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;