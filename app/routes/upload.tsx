import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { generateUUID } from "~/lib/utils";
import FileUpload from "~/components/FileUpload";
import {
  prepareInstructions,
  AIResponseFormat,
  uploadInstructions,
} from "~/constants";
import { convertPdfToImage } from "~/lib/pdfToImage";
import { Button } from "~/components/ui/button";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({
        jobTitle,
        jobDescription,
        AIResponseFormat: AIResponseFormat,
      })
    );
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main>
      <Navbar />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)]">
        <header className="flex flex-col gap-3 p-12 text-white overflow-y-auto">
          <h1 className="text-4xl font-bold">
            Smart Feedback for Your Dream Job
          </h1>
          <h2 className="text-lg text-yellow-300">
            Drop your resume to get AI-powered insights, ATS score & improvement
            tips.
          </h2>

          <div className="mt-5 space-y-6">
            <h1>How It Works</h1>
            {uploadInstructions.map((step, i) => (
              <div key={i} className="text-lg">
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-gray-200 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </header>

        {/* RIGHT SIDE – Upload Form */}
        <section className="p-12 flex flex-col justify-center h-full overflow-y-auto">
          {isProcessing ? (
            <>
              <p>{statusText}</p>
              <img
                src="/images/resume-scan.gif"
                className="w-full max-w-md mt-4 rounded-lg"
                alt="Analyzing Resume"
              />
            </>
          ) : (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <div className="form-div">
                <div>
                  <label htmlFor="company-name" className="font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="e.g. Google"
                    id="company-name"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
                <div>
                  <label htmlFor="job-title" className="font-semibold">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="e.g. Frontend Developer"
                    id="job-title"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="job-description" className="font-semibold">
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Paste the job description here"
                  id="job-description"
                  className="border p-2 rounded-md w-full"
                />
              </div>

              <div className="w-full ">
                <label htmlFor="uploader" className="font-semibold">
                  Upload Resume (PDF only)
                </label>
                <FileUpload onFileSelect={handleFileSelect} />
              </div>

              <Button
                className="bg-[#ffd900] rounded-xl text-gray-800 hover:bg-yellow-400 transition"
                type="submit"
              >
                Analyze Resume
              </Button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};
export default Upload;
