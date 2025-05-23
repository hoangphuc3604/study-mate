import os
from langchain_openai import ChatOpenAI

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(
    openai_api_key=OPENAI_API_KEY,
    temperature=0.3,
    model="gpt-3.5-turbo",
    max_tokens=2000
)
