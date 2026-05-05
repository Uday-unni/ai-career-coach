# prompts.py

def resume_analysis_prompt(resume_text, job_description):
    return f"""
    You are an expert career coach and ATS specialist.

    Analyze this resume against the job description below.

    RESUME:
    {resume_text}

    JOB DESCRIPTION:
    {job_description}

    Return ONLY a JSON object with exactly these fields:
    {{
        "match_score": (integer between 0 and 100),
        "strengths": (list of 3-5 strings),
        "gaps": (list of 3-5 strings),
        "suggestions": (list of 3-5 strings)
    }}

    Return ONLY the JSON. No extra text. No markdown.
    """


def cover_letter_prompt(resume_text, job_description, user_name):
    return f"""
    You are an expert career coach.

    Write a professional cover letter for this candidate.

    CANDIDATE NAME: {user_name}

    RESUME:
    {resume_text}

    JOB DESCRIPTION:
    {job_description}

    Requirements:
    - Maximum 3 paragraphs
    - Professional but human tone
    - Mention specific skills from resume that match the job
    - Do NOT use generic phrases like "I am a hard worker"
    - Return plain text only
    """