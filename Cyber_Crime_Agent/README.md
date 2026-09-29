# Cyber Crime Agent

A retrieval-augmented question-answering agent for Pakistan cyber-crime laws and NCCIA information. The script loads the local knowledge base PDF, creates searchable document embeddings, retrieves relevant passages, and asks a Groq-hosted language model to answer a question from that context.

## Requirements

- Python 3.10 or newer
- A Groq API key
- The knowledge base file at `data/NCCIA_Knowledge_Base.pdf`
- Internet access on the first run to download the embedding model and call Groq

## Setup

Create and activate a virtual environment on Windows:

```powershell
python -m venv myenv
.\myenv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

Do not commit `.env` or the `myenv/` directory. They are excluded by `.gitignore`.

## Run

```powershell
python .\cyber_agent.py
```

The first run may download the `BAAI/bge-small-en-v1.5` embedding model. The script then prints an answer for the query defined in `cyber_agent.py`.

## Change the question

Edit the final invocation in `cyber_agent.py`:

```python
response = rag_chain.invoke("where is cyber crime office gilgit")
```

Replace the text with your question and run the script again.

## Project Structure

```text
.
├── cyber_agent.py
├── requirements.txt
├── data/
│   ├── NCCIA_Knowledge_Base.pdf
│   └── PECA.pdf
├── .env                 # local secrets, not committed
└── myenv/               # local virtual environment, not committed
```

## Notes

- Answers are grounded in the retrieved local PDF content and may be incomplete or incorrect. Verify important legal information with an appropriately qualified professional or official source.
