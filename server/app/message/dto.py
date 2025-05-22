from marshmallow import Schema, fields, validate
from marshmallow.validate import Length

class MessageCreateDTO(Schema):
    content = fields.String(
        required=True,
        validate=Length(min=1, max=500),
        error_messages={"required": "Content is required", "null": "Content cannot be null"}
    )
    conversation_id = fields.Integer(
        required=True,
        error_messages={"required": "Conversation ID is required", "null": "Conversation ID cannot be null"}
    )
    type = fields.String(
        required=True,
        validate=validate.OneOf(['bot', 'user']),
        error_messages={"required": "Type is required", "null": "Type cannot be null"}
    )