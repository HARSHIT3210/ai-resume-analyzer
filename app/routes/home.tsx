import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

// Import React Icons
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlinePsychology, MdTrendingUp } from "react-icons/md";

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
    <main className="min-h-screen">
      <Navbar />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20 py-16 items-center">
        {/* Left - Hero Text */}
        <div className="space-y-4 px-10">
          <h1>Not Sure If Your Resume Stands Out?</h1>
          <h2>
            Get instant, AI-powered insights to polish your resume and land your
            dream job all with just one click.
          </h2>

          <Link to="/upload">
            <Button className="bg-[#ffd900] hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300">
              Upload Resume
            </Button>
          </Link>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mt-6 max-w-md">
            <div className="flex gap-4 items-start rounded-xl border p-4 bg-gray-50 hover:bg-gray-100 transition shadow-sm">
              <FaCheckCircle className="text-green-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  Personalized Feedback
                </h3>
                <p className="text-sm text-gray-600">
                  Get tailored suggestions to improve your resume instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start rounded-xl border p-4 bg-gray-50 hover:bg-gray-100 transition shadow-sm">
              <MdOutlinePsychology className="text-indigo-500 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  Job-Specific Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  Our AI is trained on real job data to match hiring trends.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start rounded-xl border p-4 bg-gray-50 hover:bg-gray-100 transition shadow-sm">
              <MdTrendingUp className="text-blue-500 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  Boost Interview Chances
                </h3>
                <p className="text-sm text-gray-600">
                  Optimize your resume for better visibility with recruiters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Illustration */}
        <div className="flex justify-center items-center">
          <img
            src="/images/heroImage.png"
            alt="Resume Analysis Illustration"
            className="w-[280px] md:w-[360px] mt-10 h-auto object-contain rounded-2xl"
          />
        </div>
      </section>
    </main>
  );
}
