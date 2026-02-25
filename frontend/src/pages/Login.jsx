import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Vite environment variable
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!API_BASE_URL) {
      alert("Config Error: VITE_API_URL is missing in .env file!");
      return;
    }

    // Safety: Ensure no double slashes if API_BASE_URL ends with /
    const cleanURL = API_BASE_URL.endsWith('/') 
      ? API_BASE_URL.slice(0, -1) 
      : API_BASE_URL;

    try {
      console.log("Attempting login at:", `${cleanURL}/api/auth/login`);
      
      const res = await axios.post(`${cleanURL}/api/auth/login`, formData);
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        
        alert(`Welcome ${res.data.user.name}!`);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      // Detailed error logging for debugging
      console.error("Login Error Details:", err.response || err);
      
      const errorMessage = err.response?.data?.message || "Login failed! Server unreachable.";
      alert(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="job-form">
        <h2>🔑 Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          name="email"
          autoComplete="email"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password"
          autoComplete="current-password"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;