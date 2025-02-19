"use client"
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [match, setMatch] = useState<number | null>(null);

  const uploadResume = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setResumeText(data.resume_text);
  };

  const matchJob = async () => {
    const response = await fetch("http://127.0.0.1:8000/match-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_text: resumeText, text: jobDesc }),
    });
    const data = await response.json();
    setMatch(data.match_percentage);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">AI Resume Analyzer</h1>

      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadResume} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Upload & Analyze
      </button>

      {resumeText && (
        <>
          <textarea
            className="w-full border p-2 mt-4"
            rows={5}
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste job description here..."
          />
          <button onClick={matchJob} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Match with Job
          </button>

          {match !== null && <p className="mt-4 text-lg">Match: {match}%</p>}
        </>
      )}
    </div>
  );
}
