import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import AnalyzeButton from "../components/AnalyzeButton";
import api from "../services/api";
import ResultCard from "../components/ResultCard";

function Home() {

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);


  const analyzeResume = async () => {

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("job_description", jobDescription);


      const response = await api.post("/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      setResult(response.data);

      alert("Resume analyzed successfully!");

    } catch (error) {

      console.error("Axios Error:", error);

      if (error.response) {
        console.log("Response:", error.response.data);
        console.log("Status:", error.response.status);
      } 
      else if (error.request) {
        console.log("Request:", error.request);
      } 
      else {
        console.log("Message:", error.message);
      }

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };


  // Reset everything for a new analysis
  const resetAnalysis = () => {

    setResume(null);
    setJobDescription("");
    setResult(null);
    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-5xl font-bold text-center text-blue-500">
        AI ATS Resume Analyzer
      </h1>


      <p className="text-center text-gray-400 mt-4">
        Upload your resume and compare it with any job description using AI.
      </p>


      <div className="mt-10 bg-slate-800 rounded-xl shadow-lg p-8">


        <ResumeUpload 
          onFileChange={setResume} 
        />


        <JobDescription
          value={jobDescription}
          onChange={setJobDescription}
        />


        <AnalyzeButton
          onClick={analyzeResume}
          loading={loading}
        />


        <ResultCard 
          result={result}
          onNewAnalysis={resetAnalysis}
        />


        <footer className="text-center text-gray-400 mt-10 mb-5">

          Made with ❤️ using React, FastAPI & Google Gemini

        </footer>


      </div>


    </div>

  );

}


export default Home;