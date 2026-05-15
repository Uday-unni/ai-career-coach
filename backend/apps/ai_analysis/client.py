from groq import Groq
import os
import json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def call_gemini(prompt):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000,
        )
        return response.choices[0].message.content
    except Exception as e:
        raise ValueError(f"AI API error: {str(e)}")


def call_gemini_json(prompt):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000,
        )
        text = response.choices[0].message.content
        text = text.strip()
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()
        return json.loads(text)
    except json.JSONDecodeError:
        raise ValueError("AI did not return valid JSON")
    except Exception as e:
        raise ValueError(f"AI API error: {str(e)}")