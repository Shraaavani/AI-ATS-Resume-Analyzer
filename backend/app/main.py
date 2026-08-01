from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analyze import router

app = FastAPI(
    title="AI ATS Resume Analyzer",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-ats-resume-analyzer-seven.vercel.app",
        "https://ai-ats-resume-analyzer-4tatdu56f-shravani14.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "AI ATS Resume Analyzer API Running"
    }