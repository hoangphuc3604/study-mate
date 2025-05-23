import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, History, User, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useConversation } from "@/hooks/data/useConversation";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setConversation } = useConversation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNewChat = () => {
    setConversation(undefined);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-studymate-400 to-studymate-600 bg-clip-text text-transparent">
              StudyMate
            </span>
          </Link>
          
          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          ) : (
            <div className="flex items-center space-x-1">
              {/* Desktop Navigation */}
              <Button variant="ghost" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Trang chủ
                </Link>
              </Button>

              {isLoggedIn ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/history">
                      <History className="mr-2 h-4 w-4" />
                      Lịch sử
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={handleNewChat}>
                    <Link to="/chat">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4v16m0 0H3"/></svg>
                      Đoạn chat mới
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Hồ sơ
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/logout">Đăng xuất</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Đăng nhập
                    </Link>
                  </Button>
                  <Button className="bg-studymate-400 hover:bg-studymate-500" asChild>
                    <Link to="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Đăng ký
                    </Link>
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Trang chủ
                </Link>
              </Button>

              {isLoggedIn ? (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/history">
                      <History className="mr-2 h-4 w-4" />
                      Lịch sử
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/chat">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4v16m0 0H3"/></svg>
                      Đoạn chat mới
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Hồ sơ
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/logout">Đăng xuất</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="justify-start"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Đăng nhập
                    </Link>
                  </Button>
                  <Button
                    className="bg-studymate-400 hover:bg-studymate-500 justify-start"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Đăng ký
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
