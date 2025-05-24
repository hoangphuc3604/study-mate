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

    def update_preview(self, conversation_id: int, preview: str):
        """Update the preview of a conversation."""
        conversation = Conversation.query.get(conversation_id)
        if conversation:
            conversation.preview = preview
            db.session.commit()
            return True
        else:
            return False

    def get_messages(self, conversation_id: int):
        conversation = Conversation.query.get(conversation_id)
        if conversation:
            return conversation.messages
        else:
            return []

    def get_conversations(self, user_id: int):
        return Conversation.query.filter_by(user_id=user_id).all()

    def delete_conversation(self, conversation_id: int, user_id: int):
        """Delete a conversation and its messages."""
        conversation = Conversation.query.get({"id": conversation_id})
        if conversation and conversation.user_id != user_id:
            raise Exception("Bạn không có quyền xóa cuộc hội thoại này.")
        if conversation:
            for message in conversation.messages:
                db.session.delete(message)
            db.session.delete(conversation)
            db.session.commit()
            return True
        else:
            raise Exception("Cuộc hội thoại không tồn tại.")