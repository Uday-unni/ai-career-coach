import fitz
import requests
import tempfile
import os


def extract_text_from_pdf(file_path_or_url):
    tmp_path = None

    try:
        if str(file_path_or_url).startswith("http"):
            response = requests.get(str(file_path_or_url), timeout=30)
            response.raise_for_status()

            with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
                tmp.write(response.content)
                tmp_path = tmp.name

            source = tmp_path
        else:
            source = str(file_path_or_url)

        doc = fitz.open(source)
        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        text = text.strip()

        if not text:
            raise ValueError("No readable text found in PDF.")

        return text

    except Exception as e:
        raise ValueError(f"Could not extract text from PDF: {str(e)}")

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)