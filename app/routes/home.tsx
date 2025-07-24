import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resulyzer - An AI Powered Resume Analyzer" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="min-h-screen ">
      <Navbar />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-20 py-20 items-center">
        {/* Left - Hero Text */}
        <div className="space-y-6">
          <h1 >
            Not Sure If Your Resume Stands Out?
          </h1>
          <h2 >
            Get instant, AI-powered insights to polish your resume and land your dream job.
          </h2>
          <Link to="/upload">
            <Button className="bg-[#ffd900] hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300">
              Upload Resume
            </Button>
          </Link>
        </div>

        {/* Right - Illustration */}
        <div className="flex justify-center items-center">
          <img
            src="/images/heroImage.png"
            alt="Resume Analysis Illustration"
            className="w-[280px] md:w-[350px] mt-10 h-auto object-contain rounded-2xl "
          />
        </div>
      </section>
    </main>
  );
}
