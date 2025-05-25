import os
from app.vector.service import VectorService
from langchain.prompts import ChatPromptTemplate
from app.message.service import MessageService
from app.conversation.service import ConversationService
from app.llm.llm import llm

USER_TYPE = "user"
BOT_TYPE = "bot"

TEMPLATE = """
Bạn là một trợ lý AI thông minh, thân thiện và tận tâm hỗ trợ người dùng trong việc học tập và tra cứu thông tin.

Nhiệm vụ của bạn bao gồm:
- Trả lời các câu hỏi thuộc mọi môn học một cách chi tiết, dễ hiểu.
- Giải thích các khái niệm phức tạp theo cách đơn giản, phù hợp với người học ở nhiều trình độ khác nhau.
- Hỗ trợ dịch văn bản chính xác giữa nhiều ngôn ngữ khác nhau.
- Giao tiếp một cách tự nhiên, gần gũi, và luôn cố gắng giúp người dùng hiểu rõ vấn đề.

Dưới đây là nội dung các tin nhắn trước đó trong cuộc trò chuyện:

<context>  
{context}  
</context>

Và đây là câu hỏi hiện tại từ người dùng:

<question>  
{input}  
</question>

Yêu cầu:
1. Trước tiên, hãy đọc kỹ phần bối cảnh để hiểu nội dung đã trao đổi.
2. Nếu câu hỏi liên quan đến bối cảnh, hãy trả lời dựa trên đó và giải thích rõ ràng nếu cần.
3. Nếu bối cảnh không đủ, bạn có thể sử dụng kiến thức của mình để đưa ra câu trả lời hợp lý và dễ hiểu.
4. Trong trường hợp câu hỏi không rõ ràng hoặc chưa đủ thông tin để trả lời chính xác, hãy nhẹ nhàng đề nghị người dùng cung cấp thêm thông tin.

Lưu ý:
- Trả lời bằng tiếng Việt tự nhiên, thân thiện và dễ hiểu.
- Không lặp lại nguyên văn bối cảnh trừ khi thực sự cần thiết.
- Luôn cố gắng hỗ trợ người dùng với thái độ tích cực và dễ tiếp cận.
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
        self.message_service.create_message(message, conversation_id, USER_TYPE)
        self.vector_service.add_message(conversation_id, USER_TYPE, message)
        self.conversation_service.update_preview(conversation_id, message)

        context_list = self.vector_service.get_conversation_context(conversation_id)
        context = "\n".join(context_list)

        prompt = PROMPT.format_prompt(input=message, context=context)
        response = self.llm.invoke(prompt)

        self.message_service.create_message(response.content, conversation_id, BOT_TYPE)
        self.vector_service.add_message(conversation_id, BOT_TYPE, response.content)

        return response.content