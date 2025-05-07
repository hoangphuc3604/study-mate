
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Book, Globe, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-slide-in">
                <span className="bg-gradient-to-r from-studymate-400 to-studymate-600 bg-clip-text text-transparent">
                  StudyMate
                </span>
                <span> – Trợ lý học tập AI</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Chat với AI để giải thích kiến thức, dịch thuật, hoặc hỗ trợ làm bài tập
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button size="lg" className="bg-studymate-400 hover:bg-studymate-500" asChild>
                  <Link to="/chat">
                    Bắt đầu ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Đăng nhập để sử dụng</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 max-w-md animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Học sinh tương tác với AI" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tính năng nổi bật
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-studymate-100 p-4 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-studymate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trò chuyện thông minh</h3>
                <p className="text-muted-foreground">
                  Đặt câu hỏi và nhận câu trả lời chi tiết từ AI. Hỗ trợ mọi môn học.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-studymate-100 p-4 rounded-full mb-4">
                  <Book className="h-8 w-8 text-studymate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Giải thích dễ hiểu</h3>
                <p className="text-muted-foreground">
                  Nhận giải thích về các khái niệm phức tạp một cách đơn giản, dễ hiểu.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-studymate-100 p-4 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-studymate-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hỗ trợ dịch thuật</h3>
                <p className="text-muted-foreground">
                  Dịch văn bản giữa nhiều ngôn ngữ với độ chính xác cao.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-studymate-100 to-studymate-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng cải thiện việc học của bạn?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Hãy tham gia cùng hàng nghìn học viên đang sử dụng StudyMate để học tập hiệu quả hơn.
          </p>
          <Button size="lg" className="bg-studymate-400 hover:bg-studymate-500" asChild>
            <Link to="/register">Đăng ký miễn phí</Link>
          </Button>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
