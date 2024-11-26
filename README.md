# BookMind

[![thumbnail](https://github.com/user-attachments/assets/11c6f1f3-59db-4638-9b1a-68f1d25efec4)](https://youtu.be/DL4-DswxfEM)

BookMind is a web application that allows users to explore character relationships and storylines in books using AI-powered visualizations. The application provides interactive mind maps, AI chatbots for deep questions, book summaries, and community contributions.

## Features

- Interactive Mind Maps: Visualize relationships between characters and plot elements.
- AI Chatbot: Ask deep questions about the book and get insightful answers.
- Book Summaries: Get concise overviews of plots and themes.
- Community Contributions: Add and refine maps with fellow book lovers.

## Prerequisites

- Node.js
- Python >= 3.10
- LlamaStack server running locally
- Environment variables:
  - LLAMA_STACK_PORT
  - INFERENCE_MODEL
  - REACT_APP_GOOGLE_BOOKS_API_KEY

## Getting Started

### Backend Setup

1. Install dependencies:

```
pip install -r server/requirements.txt
```

2. Run the server:

```
python server/server.py
```

### Frontend Setup

1. Install dependencies:

```
npm install
```

2. Run the application:

```
npm start
```

## Usage

1. Initialize Memory: Upload your book or choose from the library to initialize memory.
2. AI Analysis: The AI analyzes the book and generates a mind map.
3. Explore Insights: Explore relationships, themes, and Q&A insights.
