import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "~/components/ScoreCircle";
import { Card, CardContent } from "../components/ui/card";
import { Icons } from "./spinner";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath]);

  return (
    <Link to={`/resume/${id}`} className="block group">
      <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
        {/* Image */}
        <div className="relative w-full h-[250px] bg-gray-100">
          {loadingImage && (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-100">
              <Icons.spinner className="h-12 w-12 animate-spin text-gray-400" />
            </div>
          )}
          {resumeUrl && (
            <img
              src={resumeUrl}
              alt="Resume Preview"
              onLoad={() => setLoadingImage(false)}
              className={`w-full h-full object-cover object-top rounded-xl p-2 transition duration-300 group-hover:scale-105 ${
                loadingImage ? "opacity-0" : "opacity-100"
              }`}
            />
          )}
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-900 truncate max-w-[220px]">
                {companyName || "Untitled Resume"}
              </p>
              {jobTitle && (
                <p className="text-sm text-gray-800 truncate max-w-[220px]">
                  {jobTitle}
                </p>
              )}
            </div>
            <ScoreCircle score={feedback?.overallScore || 0} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ResumeCard;
