import os
from app.vector.service import VectorService
from langchain.prompts import ChatPromptTemplate
from app.message.service import MessageService
from app.conversation.service import ConversationService
from app.llm.llm import llm

USER_TYPE = "user"
BOT_TYPE = "bot"

TEMPLATE = """
Bạn là một trợ lý thông minh đang tham gia cuộc trò chuyện với người dùng.

Dưới đây là bối cảnh của các tin nhắn trước đó trong đoạn hội thoại:

<context>
{context}
</context>

Và đây là câu hỏi hiện tại từ người dùng:

<question>
{input}
</question>

Yêu cầu:
1. Trước tiên, hãy đọc kỹ phần bối cảnh để hiểu các thông tin đã được nói đến.
2. Nếu câu hỏi có thể trả lời được dựa trên bối cảnh, hãy trả lời dựa trên đó, giải thích rõ ràng nếu cần thiết.
3. Nếu không tìm thấy đủ thông tin trong bối cảnh, bạn có thể dùng kiến thức chung của mình để trả lời.
4. Nếu không thể trả lời dù đã cố gắng, hãy nói: "Xin lỗi, tôi chưa có đủ thông tin để trả lời câu hỏi này."

Lưu ý:
- Trả lời bằng tiếng Việt tự nhiên, thân thiện.
- Đừng lặp lại nguyên văn bối cảnh trừ khi cần thiết.
- Tránh nói những điều không chắc chắn.
"""
PROMPT = ChatPromptTemplate.from_template(TEMPLATE)

class ChatService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance
    
    def __init__(self):
        self.llm = llm
        self.vector_service = VectorService()
        self.message_service = MessageService()
        self.conversation_service = ConversationService()

    def handle_user_message(self, conversation_id: int, message: str):
        """Handle user message and generate a response."""
        message_res = self.message_service.create_message(message, conversation_id, USER_TYPE)
        self.vector_service.add_message(conversation_id, USER_TYPE, message)
        self.conversation_service.update_last_message_id(conversation_id, message_res.to_dict()["id"])

        context_list = self.vector_service.get_conversation_context(conversation_id)
        context = "\n".join(context_list)

        prompt = PROMPT.format_prompt(input=message, context=context)
        response = self.llm.invoke(prompt)

        self.message_service.create_message(response.content, conversation_id, BOT_TYPE)
        self.vector_service.add_message(conversation_id, BOT_TYPE, response.content)

        return response.content