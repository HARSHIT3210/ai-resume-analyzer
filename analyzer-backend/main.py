from fastapi import FastAPI, UploadFile, File
import pdfplumber
import uvicorn
from pydantic import BaseModel
import spacy

app = FastAPI()

nlp = spacy.load("en_core_web_sm")  # NLP Model for analysis

class JobDescription(BaseModel):
    text: str

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """Extracts text from a resume (PDF only for now)."""
    if file.filename.endswith(".pdf"):
        with pdfplumber.open(file.file) as pdf:
            text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
        return {"resume_text": text}
    return {"error": "Only PDF files are supported."}

@app.post("/extract")
async def extract_data(text: str):
    """Extracts name, email, and skills using NLP."""
    doc = nlp(text)
    skills = [token.text for token in doc if token.ent_type_ == "SKILL"]  # Sample skill detection
    return {"name": doc.ents[0].text if doc.ents else "Unknown", "skills": skills}

@app.post("/match-job")
async def match_job(resume_text: str, job: JobDescription):
    """Compares resume with job description."""
    resume_words = set(resume_text.lower().split())
    job_words = set(job.text.lower().split())
    match_percentage = (len(resume_words & job_words) / len(job_words)) * 100
    return {"match_percentage": round(match_percentage, 2)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)