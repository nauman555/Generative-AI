# Generative AI — Learning & Experiments

A collection of Node.js scripts demonstrating various **Generative AI** concepts using the [Groq SDK](https://console.groq.com/) and other AI tools. Each file is a standalone example showcasing a different capability of modern LLMs.

---

## 🔧 Prerequisites

- **Node.js** v18 or later
- **npm** (comes with Node.js)
- A [Groq API Key](https://console.groq.com/keys)
- A [Tavily API Key](https://tavily.com/) (only for `tool_calling.js`)


---

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
GROQ_API_KEY=your_groq_api_key_here
TVLY_API_KEY=your_tavily_api_key_here
```

---

## Program Files

### 1. `app.js` — Basic Chat Completion

> **The starting point** — A simple example of sending a prompt to an LLM and getting a response.

**What it does:**
- Connects to the Groq API using the `groq-sdk` package.
- Sends a system prompt (cybercrime expert persona) and a user message to the `llama-3.3-70b-versatile` model.
- Prints the AI-generated response to the console.

**Key Concepts:**
- Chat completions API
- System & user roles in message arrays
- Environment variable configuration with `dotenv`

**Run:**
```bash
node app.js
```

---

### 2. `response_format.js` — Structured JSON Output

> **Getting structured data** — Forces the LLM to return responses in a strict JSON schema.

**What it does:**
- Sends a product review text to the `openai/gpt-oss-20b` model.
- Uses `response_format` with `json_schema` to enforce a strict output structure.
- Extracts and displays structured fields: product name, rating, sentiment, and key features.

**Key Concepts:**
- JSON Schema-based response formatting
- Strict mode for guaranteed schema compliance
- Structured data extraction from unstructured text

**Expected Output:**
```json
{
  "product_name": "UltraSound Headphones",
  "rating": 4.5,
  "sentiment": "positive",
  "key_features": ["noise cancellation", "battery life", "sound quality"]
}
```

**Run:**
```bash
node response_format.js
```

---

### 3. `api_validator.js` — API Response Validation

> **Advanced structured output** — Uses a complex JSON schema to validate and standardize API responses.

**What it does:**
- Takes a raw API response (with intentional issues like an invalid email).
- Uses the `openai/gpt-oss-120b` model with a detailed JSON schema to validate every field.
- Returns a comprehensive validation report including:
  - Per-field validation results
  - Data quality score (0–1)
  - Suggested fixes
  - REST compliance checks
  - A standardized response format

**Key Concepts:**
- Complex nested JSON schemas
- API response validation patterns
- Data quality scoring
- REST standards compliance checking

**Run:**
```bash
node api_validator.js
```

---

### 4. `tool_calling.js` — Tool Calling with Web Search

> **Agentic AI** — The LLM decides when it needs real-time data and calls an external tool (Tavily web search) to fetch it.

**What it does:**
- Defines a `tool_calling` function that searches the internet using the [Tavily API](https://tavily.com/).
- Registers this function as a tool that the LLM can invoke.
- Sends a user query (e.g., "when was iPhone 16 launched") to the `llama-3.3-70b-versatile` model.
- The LLM decides whether to:
  - **Answer directly** if it already has the information, or
  - **Call the tool** to search the web for real-time data.
- If the tool is called, the search results are printed to the console.

**Key Concepts:**
- LLM tool/function calling
- Agentic decision-making (LLM chooses when to use tools)
- Real-time web search integration with Tavily
- Parsing tool call arguments from the model response

**Run:**
```bash
node tool_calling.js
```


---

##  Tech Stack

| Package        | Purpose                              |
| -------------- | ------------------------------------ |
| `groq-sdk`     | LLM API client (Groq Cloud)         |
| `dotenv`       | Load environment variables from `.env` |
| `@tavily/core` | Web search API for tool calling      |
| `openai`       | OpenAI-compatible SDK                |

-
