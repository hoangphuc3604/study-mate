from marshmallow import Schema, fields, validate
from marshmallow.validate import Length

class ConversationCreateDTO(Schema):
    title = fields.String(required=False, validate=Length(min=0, max=255))
    first_message = fields.String(required=False, validate=Length(min=0, max=255))