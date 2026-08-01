import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-ats-resume-analyzer-1296.onrender.com",
});

export default api;