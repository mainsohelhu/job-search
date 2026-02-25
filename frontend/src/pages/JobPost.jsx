import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    contactEmail: '',
    description: ''
  });
  
  const navigate = useNavigate();

  // Vite environment variable (No fallback, seedha production URL)
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if API URL is missing before making the request
    if (!API_BASE_URL) {
      alert("Configuration Error: API URL is missing!");
      return;
    }

    const finalData = { 
      ...formData, 
      location: formData.location || "Remote",
      skills: [] 
    };

    // Template literal use karke production URL par post kar rahe hain
    axios.post(`${API_BASE_URL}/api/jobs`, finalData)
      .then(() => {
        alert("Job Posted Successfully! 🚀");
        navigate("/"); 
      })
      .catch(err => {
        console.error("Post Error:", err.response?.data);
        alert("Error: " + (err.response?.data?.error || "Server issue"));
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="job-form">
        <h2>➕ Post a New Opening</h2>
        
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
        <input name="location" placeholder="Location (e.g. Raipur, Remote)" value={formData.location} onChange={handleChange} />
        <input name="salary" placeholder="Salary (e.g. 10 LPA)" value={formData.salary} onChange={handleChange} required />
        <input name="contactEmail" type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />
        
        <textarea 
          name="description" 
          placeholder="Detailed Job Description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          rows="5"
        />
        
        <button type="submit" className="submit-btn">Publish Job</button>
      </form>
    </div>
  );
};

export default PostJob;