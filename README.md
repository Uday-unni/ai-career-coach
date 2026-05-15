<div align="center">

# Rezumi

### AI-Powered Job Application Coach

*Land your dream job faster with AI-powered resume analysis,
cover letter generation, GitHub profile scanning, and interview preparation.*

[Live Demo](https://rezumi-topaz.vercel.app) · [Report Bug](#) · [Request Feature](#)

</div>

---

## Overview

Rezumi is a full-stack SaaS application that helps job seekers optimize
their job search using artificial intelligence. It analyzes resumes against
job descriptions, generates personalized cover letters, scans GitHub profiles,
and prepares candidates for interviews — all in one place.

---

## Features

### AI Resume Analyzer
Upload your PDF resume and paste a job description. Rezumi uses Google
Gemini AI to calculate a match score, identify skill gaps, highlight
strengths, and provide actionable improvement suggestions.

### Cover Letter Generator
Generate personalized, professional cover letters in seconds. Each letter
is tailored to the specific job description using your actual resume content.

### GitHub Profile Scanner
Enter your GitHub username to analyze your public repositories against job
requirements. Get a profile score, identify standout projects, and discover
missing skills.

### Interview Coach
Get a complete interview preparation package powered by AI. Includes the
top 10 likely questions with STAR format answers, company insights, smart
questions to ask the interviewer, and potential red flags to watch out for.

### Kanban Board
Track all your job applications visually with a drag-and-drop Kanban board.
Move applications between Saved, Applied, Interview, Offer, and Rejected
columns instantly.

### Application Tracker
Manage all your job applications in one place. Add company details, job
descriptions, locations, and notes. Never lose track of where you applied.

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python 3.13 | Programming language |
| Django 6 | Web framework |
| Django REST Framework | REST API |
| PostgreSQL | Database |
| SimpleJWT | Authentication |
| Groq AI | AI analysis |
| PyMuPDF | PDF text extraction |
| Celery + Redis | Background tasks |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Framer Motion | Animations |
| Tailwind CSS | Styling |
| Zustand | State management |
| Axios | API calls |
| @hello-pangea/dnd | Drag and drop |
| Vite | Build tool |

---

## Getting Started

### Prerequisites

```bash
Python 3.10+
Node.js 18+
PostgreSQL
Redis
```

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/Uday-unni/ai-career-coach.git
cd ai-career-coach/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Fill in your values in .env

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend/` folder:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DB_PASSWORD=your-postgresql-password
GEMINI_API_KEY=your-google-gemini-api-key
REDIS_URL=redis://localhost:6379/0
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Get your free Gemini API key at [aistudio.google.com](https://aistudio.google.com)

---

## API Endpoints

### Authentication
POST   /api/users/register/       Register new user
POST   /api/users/login/          Login
POST   /api/users/token/refresh/  Refresh token
POST   /api/users/logout/         Logout
GET    /api/users/profile/        Get profile
PATCH  /api/users/profile/        Update profile

### Resume
GET    /api/resumes/    Get resume
POST   /api/resumes/    Upload resume
DELETE /api/resumes/    Delete resume

### Applications
GET    /api/applications/        List applications
POST   /api/applications/        Create application
GET    /api/applications/:id/    Get application
PATCH  /api/applications/:id/    Update application
DELETE /api/applications/:id/    Delete application

### AI Features
POST   /api/ai/analyze/       Analyze resume vs job
POST   /api/ai/cover-letter/  Generate cover letter
POST   /api/ai/interview/     Generate interview prep
GET    /api/ai/results/:id/   Get AI results

### GitHub Scanner
POST   /api/github/            Scan GitHub profile
GET    /api/github/result/:id/ Get scan results

---

## Project Structure
rezumi/
├── backend/
│   ├── apps/
│   │   ├── users/          # Authentication
│   │   ├── resumes/        # Resume upload + parsing
│   │   ├── applications/   # Job application CRUD
│   │   ├── ai_analysis/    # AI features
│   │   └── github_scanner/ # GitHub scanning
│   ├── config/             # Django settings
│   ├── requirements.txt
│   └── manage.py
│
└── frontend/
├── src/
│   ├── api/            # Axios API calls
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   └── store/          # Zustand state
├── package.json
└── vite.config.js

---

## Screenshots

> Coming soon after deployment

---

## Roadmap

- [ ] Email reminders for follow-ups
- [ ] LinkedIn profile analyzer
- [ ] Resume builder
- [ ] Job search automation
- [ ] Team collaboration features

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Uday - [@Uday-unni](https://github.com/Uday-unni)

Project Link: [https://github.com/Uday-unni/ai-career-coach](https://github.com/Uday-unni/ai-career-coach)

---

<div align="center">

Built with Django, React, and Google Gemini AI

</div>
