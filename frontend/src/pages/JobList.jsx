import { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Direct environment variable usage
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const isRecruiter = localStorage.getItem("role") === "recruiter";

  const fetchJobs = () => {
    // Agar URL missing hai toh console mein error dikhega
    if (!API_BASE_URL) {
      console.error("VITE_API_URL is not defined! Check your .env file or Render settings.");
      return;
    }

    axios.get(`${API_BASE_URL}/api/jobs`)
      .then(res => setJobs(res.data.jobs))
      .catch(err => console.log("Fetch error:", err));
  };

  useEffect(() => { 
    fetchJobs(); 
  }, []);

  const deleteJob = (id) => {
    if(window.confirm("Bhai, pakka uda du?")) {
      axios.delete(`${API_BASE_URL}/api/jobs/${id}`)
        .then(() => {
          alert("Job deleted! 🗑️");
          fetchJobs();
        })
        .catch(err => alert("Error deleting job"));
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by title or company..." 
        className="search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="job-list">
        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
          <div key={job._id} className="job-card">
            <h2>{job.title}</h2>
            <p><strong>🏢 {job.company}</strong> | 📍 {job.location}</p>
            <p>💰 {job.salary}</p>
            <p>{job.description}</p>
            
            <div className="button-group" style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
              
              <a href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`} className="apply-btn">
                Apply Now ✉️
              </a>

              {isRecruiter && (
                <button onClick={() => deleteJob(job._id)} className="delete-btn">
                  Delete 🗑️
                </button>
              )}

            </div>
          </div>
        )) : <p>No jobs found 😅</p>}
      </div>
    </div>
  );
};

export default JobList;