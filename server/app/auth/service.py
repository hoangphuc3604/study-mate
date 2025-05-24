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
        access_token = create_access_token(identity=str(user_id), expires_delta=expires)
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

    def register(self, user_register_dto: dict) -> int:
        """
        Register a new user.
        
        Args:
            user_register_dto (UserRegisterDTO): The registration details of the user.
        
        Returns:
            int: The ID of the newly registered user.
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

        return new_user.id

    def update_user(self, user_id: str, user_update_dto: dict) -> User:
        """
        Update user information.
        
        Args:
            user_id (str): The ID of the user to update.
            user_update_dto (dict): The new user information.
        
        Returns:
            User: The updated user object.
        """
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Người dùng không tồn tại")

        for key, value in user_update_dto.items():
            setattr(user, key, value)

        db.session.commit()
        return user

    def update_user_password(self, user_id: str, update_password_dto: dict) -> User:
        """
        Update user password.
        
        Args:
            user_id (str): The ID of the user to update.
            old_password (str): The old password of the user.
            new_password (str): The new password of the user.
        
        Returns:
            User: The updated user object.
        """
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Người dùng không tồn tại")

        if not user.check_password(update_password_dto.get("old_password")):
            raise ValueError("Mật khẩu cũ không đúng")

        user.set_password(update_password_dto.get("new_password"))

        db.session.commit()
        return user
