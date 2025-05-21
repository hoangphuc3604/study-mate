import datetime
from flask_jwt_extended import create_access_token
from app.auth.model import User
from app.auth.dto import UserLoginDTO, UserRegisterDTO
from app import db
from typing import Tuple

class AuthService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance
    
    def generate_token(self, user_id: str) -> str:
        """
        Generate a JWT token for the user.
        
        Args:
            user_id (str): The ID of the user.
        
        Returns:
            str: The generated JWT token.
        """
        expires = datetime.timedelta(days=1)
        access_token = create_access_token(identity=user_id, expires_delta=expires)
        return access_token

class UserService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance
    
    def __init__(self):
        self.auth_service = AuthService()
    
    def login(self, user_login_dto: dict) -> Tuple[User, str]:
        """
        Authenticate the user and generate a JWT token.

        Args:
            user_login_dto (dict): The login credentials of the user (already validated by schema).

        Returns:
            Tuple[User, str]: A tuple containing the authenticated user and the generated token.
        """
        email = user_login_dto.get("email")
        password = user_login_dto.get("password")

        if not email or not password:
            raise ValueError("Vui lòng nhập email và mật khẩu")

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            raise ValueError("Mật khẩu hoặc email không đúng")

        token = self.auth_service.generate_token(user.id)
        return user, token

    def register(self, user_register_dto: dict) -> Tuple[int, str]:
        """
        Register a new user.
        
        Args:
            user_register_dto (UserRegisterDTO): The registration details of the user.
        
        Returns:
            Tuple[dict, str]: A tuple containing the user ID and a success message.
        """
        existing_user = User.query.filter_by(email=user_register_dto["email"]).first()
        if existing_user:
            raise ValueError("Email đã tồn tại")
        
        new_user = User(
            email=user_register_dto["email"],
            fullname=user_register_dto["fullname"],
        )
        new_user.set_password(user_register_dto["password"])

        db.session.add(new_user)
        db.session.commit()
        
        return {"id": new_user.id}, "Đăng ký thành công"

        

