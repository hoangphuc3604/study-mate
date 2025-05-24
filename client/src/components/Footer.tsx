
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-studymate-500">StudyMate</h3>
            <p className="text-sm text-muted-foreground">
              Trợ lý học tập AI hỗ trợ giải thích kiến thức, dịch thuật và làm bài tập.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-studymate-500 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-studymate-500 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-studymate-500 transition-colors">
                  Trò chuyện
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-studymate-500 transition-colors">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: nvhphuc364@gmail.com</li>
              <li className="text-muted-foreground">Điện thoại: +84 869 201 610</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} StudyMate. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
