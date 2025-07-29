import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, ChevronLeft, ChevronRight, Type, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getStoryBySlug } from '@/data/mockData';

type Theme = 'dark' | 'sepia' | 'light';
type FontFamily = 'serif' | 'sans' | 'mono';

const Reader = () => {
  const { slug, chapterNumber } = useParams<{ slug: string; chapterNumber: string }>();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const [theme, setTheme] = useState<Theme>('dark');
  
  const story = slug ? getStoryBySlug(slug) : null;
  const chapter = story?.chapters.find(ch => ch.number === parseInt(chapterNumber || '1'));
  
  const currentChapterNum = parseInt(chapterNumber || '1');
  const prevChapter = story?.chapters.find(ch => ch.number === currentChapterNum - 1);
  const nextChapter = story?.chapters.find(ch => ch.number === currentChapterNum + 1);

  // Load saved settings
  useEffect(() => {
    const savedFontSize = localStorage.getItem('reader-font-size');
    const savedFontFamily = localStorage.getItem('reader-font-family');
    const savedTheme = localStorage.getItem('reader-theme');
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedFontFamily) setFontFamily(savedFontFamily as FontFamily);
    if (savedTheme) setTheme(savedTheme as Theme);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('reader-font-size', fontSize.toString());
    localStorage.setItem('reader-font-family', fontFamily);
    localStorage.setItem('reader-theme', theme);
  }, [fontSize, fontFamily, theme]);

  const increaseFontSize = () => {
    if (fontSize < 32) setFontSize(prev => prev + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(prev => prev - 2);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-reader-light-bg text-reader-light-text';
      case 'sepia':
        return 'bg-reader-sepia-bg text-reader-sepia-text';
      default:
        return 'bg-reader-bg text-reader-text';
    }
  };

  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-serif';
    }
  };

  if (!story || !chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy chương</h1>
          <Button asChild>
            <Link to="/">Về trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Reader Header */}
      <header className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/truyen/${story.slug}`}>
                  <ArrowLeft size={20} />
                </Link>
              </Button>
              <div>
                <h1 className="font-sans font-medium text-lg">{story.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Chương {chapter.number}: {chapter.title}
                </p>
              </div>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-6">
                  <h3 className="font-sans font-semibold text-lg">Cài đặt đọc</h3>
                  
                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Cỡ chữ</label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={decreaseFontSize}>
                        <Type size={14} />
                        <span className="ml-1">-</span>
                      </Button>
                      <span className="text-sm font-medium w-12 text-center">{fontSize}px</span>
                      <Button variant="outline" size="sm" onClick={increaseFontSize}>
                        <Type size={16} />
                        <span className="ml-1">+</span>
                      </Button>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Kiểu chữ</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={fontFamily === 'serif' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFontFamily('serif')}
                      >
                        Serif
                      </Button>
                      <Button
                        variant={fontFamily === 'sans' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFontFamily('sans')}
                      >
                        Sans
                      </Button>
                      <Button
                        variant={fontFamily === 'mono' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFontFamily('mono')}
                      >
                        Mono
                      </Button>
                    </div>
                  </div>

                  {/* Theme */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Giao diện</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="flex items-center gap-2"
                      >
                        <Palette size={14} />
                        Tối
                      </Button>
                      <Button
                        variant={theme === 'sepia' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('sepia')}
                        className="flex items-center gap-2"
                      >
                        <Palette size={14} />
                        Sepia
                      </Button>
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="flex items-center gap-2"
                      >
                        <Palette size={14} />
                        Sáng
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Chapter Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="font-sans font-bold text-2xl md:text-3xl mb-2">
                Chương {chapter.number}: {chapter.title}
              </h1>
              <p className="text-muted-foreground">
                {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
              </p>
            </div>

            <div 
              className={`prose prose-lg max-w-none leading-relaxed ${getFontFamilyClass()}`}
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            >
              {chapter.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between">
          {prevChapter ? (
            <Button asChild variant="outline" size="lg">
              <Link to={`/truyen/${story.slug}/${prevChapter.number}`}>
                <ChevronLeft size={20} className="mr-2" />
                Chương trước
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to={`/truyen/${story.slug}/${nextChapter.number}`}>
                Chương sau
                <ChevronRight size={20} className="ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="lg">
              <Link to={`/truyen/${story.slug}`}>
                Về trang truyện
              </Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reader;