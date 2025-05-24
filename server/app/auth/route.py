from flask import Blueprint, jsonify, request
from app.auth.service import UserService
from app.auth.dto import UserLoginDTO, UserRegisterDTO, UserInfoUpdateDTO
from flask_jwt_extended import jwt_required, get_jwt_identity

class UserController:
    def __init__(self):
        self.service = UserService()
        self.login_dto = UserLoginDTO()
        self.register_dto = UserRegisterDTO()
        self.update_dto = UserInfoUpdateDTO()
        self.user_bp = Blueprint('user_bp', __name__)

        self._register_routes()

    def _register_routes(self):
        self.user_bp.add_url_rule('/login', view_func=self.login, methods=['POST'])
        self.user_bp.add_url_rule('/register', view_func=self.register, methods=['POST'])
        self.user_bp.add_url_rule('/update/basic', view_func=self.update_user, methods=['PUT'])
        self.user_bp.add_url_rule('/update/password', view_func=self.update_user_password, methods=['PUT'])

    def login(self):
        """Login route handler."""
        try:
            data = request.json
            dto = self.login_dto.load(data)

            user, token = self.service.login(dto)
            return jsonify({"user": user.to_dict(), "access_token": token}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def register(self):
        """Register route handler."""
        try:
            data = request.json
            dto = self.register_dto.load(data)

            user_id = self.service.register(dto)
            return jsonify({"user_id": user_id}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    @jwt_required()
    def update_user(self):
        """Update user route handler."""
        try:
            data = request.json
            dto = self.update_dto.load(data)
            user_id = get_jwt_identity()

            user = self.service.update_user(user_id, dto)
            return jsonify(user.to_dict()), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @jwt_required()
    def update_user_password(self):
        """Update user password route handler."""
        try:
            data = request.json
            dto = self.update_dto.load(data)
            user_id = get_jwt_identity()

            user = self.service.update_user_password(user_id, dto)
            return jsonify(user.to_dict()), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

user_controller = UserController()
user_bp = user_controller.user_bp
