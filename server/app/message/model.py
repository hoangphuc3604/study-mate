from app import db
from datetime import datetime, timedelta, timezone

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(), nullable=False)
    timestamp = db.Column(
        db.DateTime(timezone=False),
        default=lambda: datetime.now(timezone(timedelta(hours=7))).replace(tzinfo=None)
    )
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    type = db.Column(db.Enum('bot', 'user', name='message_type'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
            'conversation_id': self.conversation_id,
            'type': self.type
        }
