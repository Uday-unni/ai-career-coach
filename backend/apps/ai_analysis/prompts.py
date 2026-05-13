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


def interview_coach_prompt(resume_text, job_description, company_name, job_title):
    return f"""
    You are a world-class interview coach with 15+ years of experience
    helping candidates land roles at top companies.

    Analyze this candidate's resume and the job description below.
    Prepare a complete interview preparation package.

    CANDIDATE RESUME:
    {resume_text}

    JOB TITLE: {job_title}
    COMPANY: {company_name}

    JOB DESCRIPTION:
    {job_description}

    Return ONLY a JSON object with EXACTLY these fields:
    {{
        "top_questions": [
            {{
                "question": "question text here",
                "answer": "strong STAR format answer based on candidate resume",
                "type": "behavioral"
            }}
        ],
        "company_insights": [
            "insight 1 about what this company likely values",
            "insight 2",
            "insight 3"
        ],
        "questions_to_ask": [
            "smart question candidate should ask interviewer 1",
            "smart question 2",
            "smart question 3",
            "smart question 4"
        ],
        "red_flags": [
            "potential weakness and how to handle it as a single string 1",
            "potential weakness and how to handle it as a single string 2",
            "potential weakness and how to handle it as a single string 3"
        ],
        "key_strengths": [
            "top strength from resume relevant to this role 1",
            "strength 2",
            "strength 3"
        ]
    }}

    IMPORTANT RULES:
    - red_flags must be STRINGS not objects
    - top_questions type must be exactly: behavioral, technical, or situational
    - Generate exactly 10 top_questions
    - Return ONLY the JSON. No extra text. No markdown.
    """