from marshmallow import Schema, fields, validate
from marshmallow.validate import Length

class MessageDTO(Schema):
    content = fields.String(required=True, validate=Length(min=1, max=500))
    conversation_id = fields.Integer(required=True, validate=validate.Range(min=1))