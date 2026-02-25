import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Seedha production environment variable
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    // URL check taaki deploy hone ke baad config error na rahe
    if (!API_BASE_URL) {
      alert("API URL not configured! ⚠️");
      return;
    }

    try {
      // Template literal se endpoint ko join kiya gaya hai
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      
      localStorage.setItem("token", res.data.token); // Token save kar lo
      localStorage.setItem("role", res.data.user.role); // Role bhi save kar lo
      
      alert(`Welcome ${res.data.user.name}!`);
      navigate("/"); // Home page par bhejo
      window.location.reload(); // Navbar refresh karne ke liye
    } catch (err) {
      // Backend se error message handle karna
      alert(err.response?.data?.message || "Login failed! Please check credentials.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="job-form">
        <h2>🔑 Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;