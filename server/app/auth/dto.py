from marshmallow import Schema, fields, validate
from marshmallow.validate import Length

class UserLoginDTO(Schema):
    email = fields.Email(required=True, validate=Length(min=1), error_messages={"required": "Email is required."})
    password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Password is required."})


class UserRegisterDTO(Schema):
    email = fields.Email(required=True, validate=Length(min=1), error_messages={"required": "Email is required."})
    password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Password is required."})
    fullname = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Full name is required."})

class UserUpdateDTO(Schema):
    email = fields.Email(required=False, validate=Length(min=1), error_messages={"required": "Email is required."})
    password = fields.String(required=False, validate=Length(min=1), error_messages={"required": "Password is required."})
    fullname = fields.String(required=False, validate=Length(min=1), error_messages={"required": "Full name is required."})

class UserChangePasswordDTO(Schema):
    old_password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Old password is required."})
    new_password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "New password is required."})
