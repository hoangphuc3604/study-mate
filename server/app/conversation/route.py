from flask import Blueprint, jsonify, request, g
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.conversation.service import ConversationService
from app.conversation.dto import ConversationCreateDTO

class ConversationController:
    def __init__(self):
        self.service = ConversationService()
        self.conversation_create_dto = ConversationCreateDTO()
        self.conversation_bp = Blueprint('conversation_bp', __name__)
        self._register_routes()

    def _register_routes(self):
        self.conversation_bp.add_url_rule('/', view_func=self.create_conversation, methods=['POST'])

    @jwt_required()
    def create_conversation(self):
        try:
            data = request.json
            dto = self.conversation_create_dto.load(data)

            title = dto.get('title')
            user_id = get_jwt_identity()

            conversation = self.service.create_conversation(title, int(user_id))
            return jsonify(conversation.to_dict()), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
conversation_controller = ConversationController()
conversation_bp = conversation_controller.conversation_bp