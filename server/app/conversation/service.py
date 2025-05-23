from app import db
from app.conversation.model import Conversation

class ConversationService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def create_conversation(self, title: str, user_id: int):
        conversation = Conversation(
            title=title,
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
            raise ValueError("Conversation not found")