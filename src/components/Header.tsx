import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, User, BookOpen, TrendingUp, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-sans font-bold text-xl text-foreground">Library</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm truyện, tác giả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-0 focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/tim-kiem" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Search size={16} />
              <span>Thể loại</span>
            </Link>
            <Link 
              to="/xep-hang" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <TrendingUp size={16} />
              <span>Xếp hạng</span>
            </Link>
            <Link 
              to="/profile/author1" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <User size={16} />
              <span>Hồ sơ</span>
            </Link>
          </nav>

          {/* Auth Button - Desktop */}
          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-gradient-primary hover:opacity-90">
              <Link to="/dang-nhap">
                <LogIn size={16} className="mr-2" />
                Đăng nhập
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm truyện, tác giả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-4 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/tim-kiem" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search size={16} />
                <span>Thể loại</span>
              </Link>
              <Link 
                to="/xep-hang" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <TrendingUp size={16} />
                <span>Xếp hạng</span>
              </Link>
              <Link 
                to="/profile/author1" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} />
                <span>Hồ sơ</span>
              </Link>
              <Button asChild variant="default" className="w-fit bg-gradient-primary">
                <Link to="/dang-nhap" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn size={16} className="mr-2" />
                  Đăng nhập
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};