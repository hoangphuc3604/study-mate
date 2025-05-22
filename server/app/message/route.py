from flask import Blueprint, jsonify, request
from app.message.service import MessageService
from app.message.dto import MessageCreateDTO

class MessageController:
    def __init__(self):
        self.service = MessageService()
        self.message_bp = Blueprint('message_bp', __name__)

        self._register_routes()

    def _register_routes(self):
        self.message_bp.add_url_rule('/', view_func=self.create_message, methods=['POST'])

    def create_message(self):
        try:
            data = request.json
            dto = MessageCreateDTO().load(data)

            content = dto.get('content')
            conversation_id = dto.get('conversation_id')
            type = dto.get('type')

            message = self.service.create_message(content, conversation_id, type)
            return jsonify(message.to_dict()), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

message_controller = MessageController()
message_bp = message_controller.message_bp