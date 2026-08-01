function JobDescription({ value, onChange }) {
  return (
    <div className="mt-8">
      <label className="block text-lg font-semibold mb-2">
        Job Description
      </label>

      <textarea
        rows="8"
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-700 rounded-lg p-4 text-white outline-none resize-none"
      />
    </div>
  );
}

export default JobDescription;