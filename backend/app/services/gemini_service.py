import os
import json
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Initialize Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Gemini model
MODEL = "models/gemini-flash-latest"


def analyze_resume(resume: str, jd: str):
    """
    Analyze a resume against a job description using Gemini.
    Returns a dictionary containing ATS score, matched skills,
    missing skills, and improvement suggestions.
    """

    prompt = f"""
You are an expert ATS Resume Analyzer.

Compare the following resume with the job description.

Return ONLY valid JSON in the following format.

{{
    "ats_score": 0,
    "matched_skills": [],
    "missing_skills": [],
    "suggestions": []
}}

Resume:
{resume}

Job Description:
{jd}
"""

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )

        text = response.text.strip()

        # Remove Markdown code blocks if Gemini returns them
        if text.startswith("```"):
            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        return json.loads(text)

    except json.JSONDecodeError:
        return {
            "ats_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestions": [
                "Gemini returned an invalid JSON response."
            ]
        }

    except Exception as e:
        return {
            "ats_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestions": [
                f"Gemini API Error: {str(e)}"
            ]
        }