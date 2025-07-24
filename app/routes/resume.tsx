import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      setImageUrl(URL.createObjectURL(imageBlob));
      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="min-h-screen ">
      <Navbar />

      <div className="flex w-full max-lg:flex-col-reverse">
        {/* Left Section - Feedback */}
        <section className="flex-1 px-8 py-6 space-y-8 animate-in fade-in duration-1000">
          <p className="text-gray-200 font-semibold text-2xl">
            Resume Review
          </p>

          {feedback ? (
            <>
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </>
          ) : (
            <div className="flex justify-center items-center py-10">
              <img
                src="/images/resume-scan-2.gif"
                alt="Loading..."
                className="w-[200px] opacity-80"
              />
            </div>
          )}
        </section>

        {/* Right Section - Resume Image */}
        <aside className="w-full max-w-[600px] sticky top-0 rounded-2xl h-screen bg-[#bc4141] flex items-center justify-center px-4 py-6 border-l max-lg:border-t max-lg:h-[400px] max-lg:relative max-lg:top-auto">
          {imageUrl && resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[90%] max-h-[90%] overflow-hidden rounded-2xl border shadow-md hover:shadow-lg transition"
            >
              <img
                src={imageUrl}
                alt="Resume"
                className="w-full h-full object-contain rounded-2xl"
              />
            </a>
          ) : (
            <div className="text-gray-400 text-sm">Loading preview...</div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default Resume;
