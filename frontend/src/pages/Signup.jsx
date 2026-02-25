import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "seeker" });
  const navigate = useNavigate();

  // Vite environment variable (Seedha production URL)
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    // Configuration check
    if (!API_BASE_URL) {
      alert("API URL missing! Check your environment settings.");
      return;
    }

    try {
      // Endpoint ko template literal ke saath update kiya gaya hai
      await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
      alert("Account ban gaya! Ab Login karo. 🚀");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Kuch galti hui hai!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignup} className="job-form">
        <h2>📝 Create Account</h2>
        <input 
          type="text" 
          placeholder="Full Name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        <label style={{fontWeight: 'bold', marginBottom: '-10px'}}>I am a:</label>
        <select 
          style={{padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0'}}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="seeker">🔍 Job Seeker</option>
          <option value="recruiter">🏢 Recruiter</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;