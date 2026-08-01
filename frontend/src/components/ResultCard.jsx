import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";
import jsPDF from "jspdf";

function ResultCard({ result }) {
  if (!result) return null;


  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI ATS Resume Analysis", 20, 20);

    doc.setFontSize(14);
    doc.text(`ATS Score: ${result.ats_score}%`, 20, 40);

    doc.text("Matched Skills:", 20, 60);
    result.matched_skills.forEach((skill, i) => {
        doc.text(`• ${skill}`, 25, 70 + i * 8);
    });

    let y = 80 + result.matched_skills.length * 8;

    doc.text("Missing Skills:", 20, y);
    result.missing_skills.forEach((skill, i) => {
        doc.text(`• ${skill}`, 25, y + 10 + i * 8);
    });

    y += 20 + result.missing_skills.length * 8;

    doc.text("Suggestions:", 20, y);
    result.suggestions.forEach((item, i) => {
        doc.text(`• ${item}`, 25, y + 10 + i * 8);
    });

    doc.save("ATS_Resume_Report.pdf");
    };

  return (
    <div className="mt-8 bg-slate-700 p-6 rounded-xl shadow-lg text-white">

      <div className="flex justify-center mb-8">
        <div className="w-36 h-36">
            <CircularProgressbar
            value={result.ats_score}
            text={`${result.ats_score}%`}
            styles={buildStyles({
                textColor: "#ffffff",
                pathColor:
                result.ats_score >= 80
                    ? "#22c55e"
                    : result.ats_score >= 60
                    ? "#facc15"
                    : "#ef4444",
                trailColor: "#334155",
            })}
            />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-green-400 mb-8">
        ATS Score
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-400">
          Matched Skills
        </h3>

        <div className="flex flex-wrap gap-2 mt-3">
        {result.matched_skills.map((skill, index) => (
            <span
            key={index}
            className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium"
            >
            {skill}
            </span>
        ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-red-400">
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2 mt-3">
        {result.missing_skills.map((skill, index) => (
            <span
            key={index}
            className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium"
            >
            {skill}
            </span>
        ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-yellow-400">
          Suggestions
        </h3>

        <ul className="list-disc ml-6 mt-2">
          {result.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={downloadPDF}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
    >
        Download PDF Report
        
        </button>

        <button
            onClick={() => {
                setResume(null);
                setJobDescription("");
                setResult(null);
            }}
            className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
            >
            New Analysis
        </button>

    </div>

  );
}

export default ResultCard;