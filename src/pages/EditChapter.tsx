import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStoryBySlug } from '@/data/mockData';

const EditChapter = () => {
  const { id: storyId, chapterId } = useParams<{ id: string; chapterId: string }>();
  const isNewChapter = chapterId === 'new';
  
  // For demo, get story info
  const story = getStoryBySlug('than-doc-dan-duong'); // Mock data
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      console.log('Chapter saved:', { title, content });
    }, 1000);
  };

  const handlePreview = () => {
    // In a real app, implement preview functionality
    console.log('Preview chapter');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link to={`/truyen/${story?.slug || ''}`}>
              <ArrowLeft size={16} className="mr-2" />
              Quay lại truyện
            </Link>
          </Button>
          <div>
            <h1 className="font-sans font-bold text-3xl">
              {isNewChapter ? 'Đăng chương mới' : 'Chỉnh sửa chương'}
            </h1>
            <p className="text-muted-foreground">
              {story?.title || 'Đang tải...'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              {/* Chapter Title */}
              <Card>
                <CardContent className="p-6">
                  <label className="block text-sm font-medium mb-2">
                    Tiêu đề chương *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề chương"
                    required
                  />
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText size={18} />
                    Nội dung chương
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết nội dung chương tại đây...

Bạn có thể sử dụng các định dạng sau:
- Xuống dòng để tạo đoạn mới
- Để trống một dòng để tạo khoảng cách giữa các đoạn
- Sử dụng dấu --- để tạo đường phân cách

Ví dụ:
Đây là đoạn văn đầu tiên của chương.

Đây là đoạn văn thứ hai, có khoảng cách với đoạn trên.

---

Đây là phần mới sau đường phân cách."
                    rows={20}
                    className="resize-none font-serif text-base leading-relaxed"
                    required
                  />
                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <span>
                      Số ký tự: {content.length}
                    </span>
                    <span>
                      Ước tính thời gian đọc: {Math.max(1, Math.round(content.length / 1000))} phút
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Chapter Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chương</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Số thứ tự
                    </label>
                    <Input
                      type="number"
                      defaultValue={isNewChapter ? story?.chapters.length ? story.chapters.length + 1 : 1 : 1}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Trạng thái
                    </label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option value="draft">Bản nháp</option>
                      <option value="published">Đã xuất bản</option>
                      <option value="scheduled">Lên lịch</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Mẹo viết hay</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Mỗi chương nên từ 2000-5000 từ</p>
                  <p>• Sử dụng đoạn văn ngắn để dễ đọc</p>
                  <p>• Kết thúc chương với tình huống hấp dẫn</p>
                  <p>• Kiểm tra chính tả trước khi đăng</p>
                  <p>• Tương tác với bình luận của độc giả</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang lưu...
                      </div>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        {isNewChapter ? 'Đăng chương' : 'Lưu thay đổi'}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handlePreview}
                  >
                    <Eye size={16} className="mr-2" />
                    Xem trước
                  </Button>

                  <Button type="button" variant="ghost" className="w-full text-muted-foreground">
                    Lưu nháp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditChapter;