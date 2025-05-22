from marshmallow import Schema, fields, validate
from marshmallow.validate import Length

class ConversationCreateDTO(Schema):
    title = fields.String(required=True, validate=Length(min=1, max=255))