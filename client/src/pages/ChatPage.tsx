import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useChat from "@/hooks/data/useChat";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isSendingMessage, messages } = useChat({ conversation_id: 3 });

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSendingMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    sendMessage({ content: input.trim() });
    setInput("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTimestamp = (date: string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-4">
        <div className="flex flex-col h-[80vh] max-w-4xl mx-auto border rounded-xl shadow-sm overflow-hidden">
          {/* Chat messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 bg-secondary/20">
            <div className="space-y-6">
              {messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div>
                    <div
                      className={
                        msg.type === "user"
                          ? "chat-bubble-user"
                          : "chat-bubble-bot"
                      }
                    >
                      {msg.content}
                    </div>
                    <div
                      className={`text-xs text-muted-foreground mt-1 ${
                        msg.type === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isSendingMessage && (
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
                disabled={isSendingMessage}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-studymate-400 hover:bg-studymate-500 h-auto"
                disabled={isSendingMessage || !input.trim()}
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
