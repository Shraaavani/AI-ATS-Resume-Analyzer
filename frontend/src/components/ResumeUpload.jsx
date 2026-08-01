import { useDropzone } from "react-dropzone";

function ResumeUpload({ onFileChange }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    maxFiles: 1,
    onDrop: (files) => {
      onFileChange(files[0]);
    },
  });

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-3 text-white">
        Upload Resume
      </label>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-slate-700 transition"
      >
        <input {...getInputProps()} />

        <p className="text-lg text-gray-300">
          📄 Drag & Drop your resume here
        </p>

        <p className="text-gray-400 mt-2">
          or click to browse (.pdf, .docx)
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <p className="mt-3 text-green-400 font-medium">
          ✅ {acceptedFiles[0].name}
        </p>
      )}
    </div>
  );
}

export default ResumeUpload;