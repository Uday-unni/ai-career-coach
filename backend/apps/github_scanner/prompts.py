def github_analysis_prompt(repos_data, job_description):
    return f"""
    You are an expert technical recruiter and career coach.

    Analyze this developer's GitHub profile against the job description.

    GITHUB REPOSITORIES:
    {repos_data}

    JOB DESCRIPTION:
    {job_description}

    Return ONLY a JSON object with EXACTLY these field names:
    {{
        "profile_score": (integer between 0 and 100),
        "technical_strengths": (list of 3-5 strings),
        "missing_skills": (list of 3-5 strings),
        "standout_projects": (list of 2-3 repo names most relevant to job),
        "suggestions": (list of 3-5 actionable improvements)
    }}

    IMPORTANT: Use EXACTLY these field names. No other field names.
    Return ONLY the JSON. No extra text. No markdown.
    """