import fitz
from docx import Document


def extract_pdf_text(file):
    pdf = fitz.open(stream=file.read(), filetype="pdf")

    text = ""

    for page in pdf:
        text += page.get_text()

    return text


def extract_docx_text(file):
    document = Document(file)

    text = "\n".join(
        paragraph.text
        for paragraph in document.paragraphs
    )

    return text