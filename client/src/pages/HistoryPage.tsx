import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDate, formatTimestamp } from "@/helpers/formatTime";
import { Conversation, useConversation } from "@/hooks/data/useConversation";
import useChat from "@/hooks/data/useChat";

const HistoryPage = () => {
  const { conversations } = useConversation();
  const [searchQuery, setSearchQuery] = useState("");
  const { conversation, setConversation, deleteConversation } = useConversation();
  const { messages } = useChat({ conversation_id: conversation?.id || 0 });
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredSessions = conversations?.filter((conversation: Conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const deleteSession = (id: number) => {
    deleteConversation(id);
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
        <h1 className="text-3xl font-bold mb-8">Lịch sử hội thoại</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - Chat list */}
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm hội thoại..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {filteredSessions?.length > 0 ? (
                filteredSessions?.map((session) => (
                  <Card 
                    key={session.id} 
                    className={`cursor-pointer hover:bg-secondary/50 transition-colors ${
                      conversation?.id === session.id ? "border-studymate-400" : ""
                    }`}
                    onClick={() => setConversation(session)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{session.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {session.preview}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSession(session.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(session.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Không tìm thấy hội thoại nào</p>
                </div>
              )}
            </div>
          </div>
          {/* Right side - Chat details */}
          <div className="w-full md:w-2/3">
            {conversation ? (
              <Card>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>{conversation.title}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/chat`}>
                        Tiếp tục hội thoại
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent ref={messagesContainerRef} className="p-4 max-h-[60vh] overflow-y-auto">
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
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full border rounded-lg p-8 bg-secondary/20">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Chọn một hội thoại</h3>
                  <p className="text-muted-foreground">
                    Chọn một hội thoại từ danh sách bên trái để xem chi tiết.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HistoryPage;
