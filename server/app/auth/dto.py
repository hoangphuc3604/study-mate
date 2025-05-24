from marshmallow import Schema, fields, validate
from marshmallow.validate import Length

class UserLoginDTO(Schema):
    email = fields.Email(required=True, validate=Length(min=1), error_messages={"required": "Email là bắt buộc."})
    password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Mật khẩu là bắt buộc."})


class UserRegisterDTO(Schema):
    email = fields.Email(required=True, validate=Length(min=1), error_messages={"required": "Email là bắt buộc."})
    password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Mật khẩu là bắt buộc."})
    fullname = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Họ và tên là bắt buộc."})

class UserInfoUpdateDTO(Schema):
    email = fields.Email(required=False, validate=Length(min=1), error_messages={"required": "Email là bắt buộc."})
    fullname = fields.String(required=False, validate=Length(min=1), error_messages={"required": "Họ và tên là bắt buộc."})

class UserChangePasswordDTO(Schema):
    old_password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Mật khẩu cũ là bắt buộc."})
    new_password = fields.String(required=True, validate=Length(min=1), error_messages={"required": "Mật khẩu mới là bắt buộc."})
