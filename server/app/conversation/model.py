from app import db

class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    last_message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    messages = db.relationship('Message', backref='conversation', lazy=True, foreign_keys='Message.conversation_id')

    def __repr__(self):
        return f'<Conversation {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'last_message_id': self.last_message_id,
            'user_id': self.user_id,
        }