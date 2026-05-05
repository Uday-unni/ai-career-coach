from google import genai
import os
import json

# Create client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def call_gemini(prompt):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        raise ValueError(f"Gemini API error: {str(e)}")


def call_gemini_json(prompt):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        text = response.text

        # Clean response in case Gemini adds markdown
        text = text.strip()
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)
    except json.JSONDecodeError:
        raise ValueError("Gemini did not return valid JSON")
    except Exception as e:
        raise ValueError(f"Gemini API error: {str(e)}")