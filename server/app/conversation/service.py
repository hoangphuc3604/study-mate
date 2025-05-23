from app import db
from app.conversation.model import Conversation
from app.llm.llm import llm
from langchain.prompts import ChatPromptTemplate

TEMPLATE = """
Dựa trên câu hỏi đầu tiên của người dùng trong đoạn chat dưới đây, hãy tạo một tiêu đề ngắn gọn, rõ ràng, phản ánh đúng chủ đề chính của cuộc hội thoại. Tiêu đề nên ngắn dưới 10 từ và dễ hiểu.

Câu hỏi đầu tiên của người dùng:
"{user_first_message}"

Tiêu đề:
"""
PROMPT = ChatPromptTemplate.from_template(TEMPLATE)

class ConversationService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance
    
    def __init__(self):
        self.llm = llm

    def create_conversation(self, title: str, first_message: str, user_id: int):
        """Create a new conversation."""
        generated_title = ""
        if not title:
            if not first_message:
                generated_title = "Cuộc hội thoại mới"
            else:
                prompt = PROMPT.format(user_first_message=first_message)
                generated_title = self.llm.invoke(prompt).content.strip('"')
        else:
            generated_title = title

        conversation = Conversation(
            title=generated_title,
            user_id=user_id,
        )
        db.session.add(conversation)
        db.session.commit()
        return conversation

    def update_last_message_id(self, conversation_id: int, message_id: int):
        conversation = Conversation.query.get(conversation_id)
        if conversation:
            conversation.last_message_id = message_id
            db.session.commit()
            return True
        else:
            raise ValueError("Conversation not found")

    def get_messages(self, conversation_id: int):
        conversation = Conversation.query.get(conversation_id)
        if conversation:
            return conversation.messages
        else:
            return []