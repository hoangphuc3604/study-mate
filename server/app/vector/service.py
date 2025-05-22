from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
import chromadb

class VectorService:
    def __init__(self, collection_name="chat_memory", chroma_host="localhost", chroma_port=8000):
        self.client = chromadb.HttpClient(host=chroma_host, port=chroma_port)
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(
            client=self.client,
            collection_name=collection_name,
            embedding_function=self.embeddings
        )

    def add_message(self, conversation_id: str, user_id: str, message: str):
        metadata = {"conversation_id": conversation_id, "user_id": user_id}
        self.vectorstore.add_texts([message], metadatas=[metadata])

    def get_conversation_context(self, conversation_id: str, k: int = 10):
        results = self.vectorstore.similarity_search(
            query="",
            k=k,
            filter={"conversation_id": conversation_id}
        )
        return [r.page_content for r in results]

    def search_similar_in_conversation(self, conversation_id: str, query: str, k: int = 3):
        results = self.vectorstore.similarity_search(
            query,
            k=k,
            filter={"conversation_id": conversation_id}
        )
        return [r.page_content for r in results]
