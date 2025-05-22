from app import db
from app.message.model import Message

class MessageService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def create_message(self, content: str, conversation_id: int, type: str):
        message = Message(
            content=content,
            conversation_id=conversation_id,
            type=type
        )
        db.session.add(message)
        db.session.commit()
        return message