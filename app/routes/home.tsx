import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resulyzer - An AI Powered Resume Analyzer" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="w-full grid grid-rows-1 grid-cols-2">
        <div className="border border-black flex flex-col items-start mt-24 justify-center gap-2 p-8">
          <div className="ml-4">
            <h1>Not Sure If Your Resume Stands Out?</h1>
            <h2 className="mt-2">
              Get instant, AI-powered insights to polish your resume and land
              your dream job.
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <Button className="bg-[#eecb08] text-gray-800 ">
              Upload Resume
            </Button>
          </div>
        </div>
        <div className="border border-black"></div>
      </div>
    </main>
  );
}
