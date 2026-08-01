from fastapi import APIRouter, UploadFile, File, Form

from app.services.parser import (
    extract_pdf_text,
    extract_docx_text,
)

from app.services.gemini_service import analyze_resume


router = APIRouter()


@router.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    if resume.filename.endswith(".pdf"):
        resume_text = extract_pdf_text(resume.file)

    elif resume.filename.endswith(".docx"):
        resume_text = extract_docx_text(resume.file)

    else:
        return {"error": "Unsupported file format"}

    result = analyze_resume(
        resume_text,
        job_description
    )

    print("\n========== RESULT ==========")
    print(result)
    print("============================\n")

    return result