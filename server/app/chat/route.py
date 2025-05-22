from flask import Blueprint, jsonify, request
from app.chat.dto import MessageDTO
from app.chat.service import ChatService

class ChatController:
    def __init__(self):
        self.chat_bp = Blueprint('chat_bp', __name__)
        self._register_routes()
        self.chat_service = ChatService()
        self.message_dto = MessageDTO()

    def _register_routes(self):
        self.chat_bp.add_url_rule('/', view_func=self.create_chat, methods=['POST'])

    def create_chat(self):
        try:
            data = request.json
            dto = self.message_dto.load(data)
            content = dto.get('content')
            conversation_id = dto.get('conversation_id')

            res = self.chat_service.handle_user_message(conversation_id, content)
            return jsonify({
                "response": res,
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        
chat_controller = ChatController()
chat_bp = chat_controller.chat_bp