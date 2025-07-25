import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Button } from "~/components/ui/button";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resulyzer | My Resumes" },
  { name: "description", content: "Keep track of your applications" },
];

const MyResumes = () => {
  const { kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
      console.log("Resumes loaded:", parsedResumes);
    };

    loadResumes();
  }, []);

  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2 className="mt-4">
            {loadingResumes
              ? "Loading your resumes..."
              : resumes.length === 0
              ? "No resumes found. Upload your first resume to get AI feedback."
              : "Review your submissions and check AI-powered feedback."}
          </h2>
        </div>

        {/* Loading state */}
        {loadingResumes && (
          <div className="flex justify-center">
            <img
              src="/images/resume-scan-2.gif"
              alt="Loading..."
              className="w-[200px] h-auto"
            />
          </div>
        )}

        {/* Resumes exist */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 gap-6">
            <img
              src="/images/heroImage.png"
              alt="Empty state"
              className="w-[220px] md:w-[280px] object-contain"
            />
            <Link to="/upload">
              <Button
                size={"lg"}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition"
              >
                Upload Resume
              </Button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyResumes;
