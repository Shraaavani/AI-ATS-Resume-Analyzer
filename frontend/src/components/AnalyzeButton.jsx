function AnalyzeButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "⏳ Analyzing Resume..." : "Analyze Resume"}
    </button>
  );
}

export default AnalyzeButton;