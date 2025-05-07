
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ChatSession {
  id: number;
  title: string;
  preview: string;
  date: string;
  messages: {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: string;
  }[];
}

const sampleData: ChatSession[] = [
  {
    id: 1,
    title: "Giải phương trình bậc hai",
    preview: "Làm thế nào để giải phương trình ax² + bx + c = 0?",
    date: "2023-05-06T14:23:00",
    messages: [
      {
        id: 1,
        text: "Làm thế nào để giải phương trình ax² + bx + c = 0?",
        sender: "user",
        timestamp: "2023-05-06T14:23:00",
      },
      {
        id: 2,
        text: "Để giải phương trình bậc hai ax² + bx + c = 0, bạn cần thực hiện các bước sau...",
        sender: "bot",
        timestamp: "2023-05-06T14:23:30",
      },
    ],
  },
  {
    id: 2,
    title: "Học từ vựng tiếng Anh",
    preview: "Có thể giúp tôi học một số từ vựng tiếng Anh về chủ đề công nghệ không?",
    date: "2023-05-05T10:15:00",
    messages: [
      {
        id: 1,
        text: "Có thể giúp tôi học một số từ vựng tiếng Anh về chủ đề công nghệ không?",
        sender: "user",
        timestamp: "2023-05-05T10:15:00",
      },
      {
        id: 2,
        text: "Dưới đây là một số từ vựng tiếng Anh về công nghệ...",
        sender: "bot",
        timestamp: "2023-05-05T10:15:45",
      },
    ],
  },
  {
    id: 3,
    title: "Giải thích hiện tượng hiệu ứng nhà kính",
    preview: "Bạn có thể giải thích về hiệu ứng nhà kính không?",
    date: "2023-05-04T16:30:00",
    messages: [
      {
        id: 1,
        text: "Bạn có thể giải thích về hiệu ứng nhà kính không?",
        sender: "user",
        timestamp: "2023-05-04T16:30:00",
      },
      {
        id: 2,
        text: "Hiệu ứng nhà kính là hiện tượng giữ nhiệt trong khí quyển Trái Đất...",
        sender: "bot",
        timestamp: "2023-05-04T16:30:45",
      },
    ],
  },
];

const HistoryPage = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(sampleData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const filteredSessions = chatSessions.filter((session) => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const deleteSession = (id: number) => {
    setChatSessions(chatSessions.filter(session => session.id !== id));
    if (selectedChat && selectedChat.id === id) {
      setSelectedChat(null);
    }
  };

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
            
            <div className="space-y-3">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <Card 
                    key={session.id} 
                    className={`cursor-pointer hover:bg-secondary/50 transition-colors ${
                      selectedChat?.id === session.id ? "border-studymate-400" : ""
                    }`}
                    onClick={() => setSelectedChat(session)}
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
            {selectedChat ? (
              <Card>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>{selectedChat.title}</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link to={`/chat?id=${selectedChat.id}`}>
                        Tiếp tục hội thoại
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    {selectedChat.messages.map((msg) => (
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
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
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
