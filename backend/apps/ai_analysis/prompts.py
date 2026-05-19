# prompts.py

def resume_analysis_prompt(resume_text, job_description):
    return f"""
    You are an expert career coach and senior ATS specialist with 15+ years of experience reviewing resumes for top companies.
    Analyze the candidate's resume against the job description provided.

    RESUME:
    {resume_text}

    JOB DESCRIPTION:
    {job_description}

    Return ONLY a JSON object with exactly these fields:
    {{
        "match_score": (integer between 0 and 100),
        "ats_score": (integer 0-100, how well resume passes ATS),
        "ats_issues": (list of 3-5 strings, ATS compatibility problems),
        "ats_keywords_found": (list of keywords from JD found in resume),
        "ats_keywords_missing": (list of important keywords missing),
        "strengths": (list of 3-5 strings),
        "gaps": (list of 3-5 strings),
        "suggestions": (list of 3-5 strings)
    }}
    
     ATS scoring rules:
    - Check for proper formatting (no tables, columns, images)
    - Check for standard section headings
    - Check for keyword density
    - Check for measurable achievements
    - Check for proper date formats

    Return ONLY the JSON. No extra text. No markdown.
    """


def cover_letter_prompt(resume_text, job_description, user_name):
    return f"""
    You are an expert career coach and senior hiring manager with 15+ years of experience.
    Write a highly persuasive, ATS-optimized cover letter for this candidate.

    CANDIDATE NAME: {user_name}

    RESUME:
    {resume_text}

    JOB DESCRIPTION:
    {job_description}

    Requirements:
    - Maximum 3 paragraphs
    -Write in a confident, professional, and genuine tone.
    -Keep the letter honest, natural, and human-sounding.
    -Use ONLY the information I provided above. Do NOT invent, assume, or make up any achievements, experiences, skills, or stories.
    -Do NOT add any extra accomplishments that I did not mention.Stick strictly to real facts and the achievements I listed.
    - Naturally incorporate exact keywords from the job description.
    - Mention specific skills from resume that match the job
    - Do NOT use generic phrases like "I am a hard worker"
    - Return plain text only
    -Structure: Strong opening → Achievements with keywords → Company fit → Confident close.
    
    [Your Full Name]
    [Phone] | [Email] | [LinkedIn] | [City]
    [Date]
    Hiring Manager
    [Company Name]
    Dear Hiring Manager,
    [Cover letter body — 3-4 paragraphs]
    Best regards,
    [Your Full Name]
    
    
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