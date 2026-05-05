import fitz

def extract_text_fom_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        text =''
        for page in doc:
            text += page.get_text()
        doc.close()
        return text.strip()
    except Exception as e:
        raise ValueError (f"Could not extract text from {file_path}")

