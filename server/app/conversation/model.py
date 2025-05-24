from app import db
from datetime import datetime, timedelta, timezone

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.String(), nullable=True)
    date = db.Column(
        db.DateTime(timezone=False),
        default=lambda: datetime.now(timezone(timedelta(hours=7))).replace(tzinfo=None)
    )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    messages = db.relationship('Message', backref='conversation', lazy=True, foreign_keys='Message.conversation_id')

    def __repr__(self):
        return f'<Conversation {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'preview': self.preview,
            'date': self.date.isoformat(),
            'user_id': self.user_id,
        }