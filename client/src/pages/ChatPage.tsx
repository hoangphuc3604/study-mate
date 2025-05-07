
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi là StudyMate, trợ lý học tập AI. Bạn cần giúp đỡ gì không?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Simulate AI response with a timeout
      setTimeout(() => {
        // Create a sample response
        let botResponse: Message = {
          id: messages.length + 2,
          text: generateSampleResponse(input.trim()),
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500); // Simulate delay
      
    } catch (error) {
      console.error("Error getting response:", error);
      setIsLoading(false);
      toast({
        title: "Lỗi",
        description: "Không thể nhận phản hồi từ AI. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };
  
  // Helper function to generate sample responses
  // In a real app, this would be replaced with an actual API call
  const generateSampleResponse = (query: string): string => {
    if (query.toLowerCase().includes("xin chào") || query.toLowerCase().includes("chào")) {
      return "Xin chào! Rất vui được gặp bạn. Tôi có thể giúp gì cho bạn hôm nay?";
    }
    
    if (query.toLowerCase().includes("toán") || query.toLowerCase().includes("phương trình")) {
      return "Để giải quyết các bài toán, chúng ta cần phân tích vấn đề bước-by-bước. Bạn có thể cung cấp chi tiết cụ thể về bài toán bạn đang gặp khó khăn không?";
    }
    
    if (query.toLowerCase().includes("dịch") || query.toLowerCase().includes("tiếng anh")) {
      return "Tôi có thể giúp bạn dịch văn bản sang nhiều ngôn ngữ khác nhau. Hãy cho tôi biết văn bản bạn muốn dịch và ngôn ngữ đích.";
    }
    
    return "Cảm ơn câu hỏi của bạn. Để tôi có thể trợ giúp hiệu quả, vui lòng cung cấp thêm thông tin hoặc đặt câu hỏi cụ thể hơn về vấn đề bạn đang gặp phải.";
  };
  
  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-4">
        <div className="flex flex-col h-[80vh] max-w-4xl mx-auto border rounded-xl shadow-sm overflow-hidden">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-secondary/20">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div>
                    <div
                      className={
                        msg.sender === "user"
                          ? "chat-bubble-user"
                          : "chat-bubble-bot"
                      }
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`text-xs text-muted-foreground mt-1 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot flex items-center space-x-2">
                    <div className="h-2 w-2 bg-studymate-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-studymate-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-studymate-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi của bạn... (Shift+Enter để xuống dòng)"
                className="min-h-[60px]"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-studymate-400 hover:bg-studymate-500 h-auto"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Nhấn Enter để gửi, Shift+Enter để xuống dòng
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
