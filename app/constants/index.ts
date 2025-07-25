export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat?: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;

// constants/index.ts
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const socialImgs = [
  {
    icon: FaGithub,
    link: "https://github.com/yourusername",
  },
  {
    icon: FaLinkedin,
    link: "https://linkedin.com/in/yourusername",
  },
  {
    icon: FaTwitter,
    link: "https://twitter.com/yourusername",
  },
];

export const uploadInstructions = [
  {
    title: "1. Upload Resume",
    desc: "Drop your resume in PDF format. We support most standard templates.",
  },
  {
    title: "2. Add Job Info",
    desc: "Paste in the job title and description so we can tailor the analysis.",
  },
  {
    title: "3. Get AI Feedback",
    desc: "Receive instant tips, score, and improvement areas — all powered by AI.",
  },
];

export const keywords = [
  "education",
  "experience",
  "skills",
  "projects",
  "certifications",
  "summary",
  "contact",
  "linkedin",
  "objective",
  "technologies",
  "profile",
];

// function isLikelyResume(text: string): boolean {
//   const lower = text.toLowerCase();
//   // Count how many keywords appear
//   const matchCount = keywords.filter((word) => lower.includes(word)).length;
//   return matchCount >= 3; // Tune this threshold as needed
// }

// const text = await extractTextFromPdf(file);
// const isResume = isLikelyResume(text);

// if (!isResume) {
//   alert("The uploaded PDF doesn't seem like a valid resume.");
//   onFileSelect?.(null);
//   return;
// }

// export async function extractTextFromPdf(file: File): Promise<string> {
//   try {
//     const lib = await loadPdfJs();
//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

//     let fullText = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       const pageText = content.items.map((item: any) => item.str).join(" ");
//       fullText += pageText + "\n";
//     }
//     console.log("Extracted text:", fullText);
//     return fullText;
//   } catch (err) {
//     console.error("Error extracting text from PDF:", err);
//     return "";
//   }
// }
