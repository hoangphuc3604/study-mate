
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@example.com");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Đã lưu thay đổi",
        description: "Thông tin cá nhân của bạn đã được cập nhật.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
        <h1 className="text-3xl font-bold mb-8">Hồ sơ người dùng</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-studymate-100 flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-studymate-500">
                    {fullName.split(" ").pop()?.[0] || "A"}
                  </span>
                </div>
                <CardTitle className="text-xl">{fullName}</CardTitle>
                <p className="text-sm text-muted-foreground">{email}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Gói dịch vụ</p>
                      <p className="text-sm text-muted-foreground">Miễn phí</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Nâng cấp
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ngày tham gia</p>
                      <p className="text-sm text-muted-foreground">06/05/2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Tài khoản</TabsTrigger>
                <TabsTrigger value="preferences">Tùy chọn</TabsTrigger>
                <TabsTrigger value="security">Bảo mật</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin tài khoản</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Họ và tên</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="bg-studymate-400 hover:bg-studymate-500"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span>Đang lưu...</span>
                            </div>
                          ) : (
                            "Lưu thay đổi"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Tùy chọn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Chế độ học từ vựng</p>
                          <p className="text-sm text-muted-foreground">
                            Tối ưu hóa AI cho việc học từ vựng
                          </p>
                        </div>
                        <Switch id="vocabulary-mode" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Giải thích khái niệm</p>
                          <p className="text-sm text-muted-foreground">
                            AI sẽ giải thích chi tiết hơn các khái niệm
                          </p>
                        </div>
                        <Switch id="concept-mode" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Luyện viết</p>
                          <p className="text-sm text-muted-foreground">
                            AI sẽ giúp cải thiện kỹ năng viết
                          </p>
                        </div>
                        <Switch id="writing-mode" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Bảo mật</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Mật khẩu mới</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-new-password">Xác nhận mật khẩu mới</Label>
                        <Input
                          id="confirm-new-password"
                          type="password"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <Button className="bg-studymate-400 hover:bg-studymate-500">
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
