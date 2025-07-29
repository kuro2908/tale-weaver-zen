import { useParams, Link } from 'react-router-dom';
import { Eye, Heart, Star, BookOpen, Bookmark, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getStoryBySlug } from '@/data/mockData';

const StoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const story = slug ? getStoryBySlug(slug) : null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy truyện</h1>
            <Button asChild>
              <Link to="/">Về trang chủ</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft size={16} className="mr-2" />
            Về trang chủ
          </Link>
        </Button>

        {/* Story Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Cover Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-elegant"
              />
            </div>
          </div>

          {/* Story Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
                {story.title}
              </h1>
              
              <Link 
                to={`/profile/${story.authorId}`}
                className="text-lg text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {story.author}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Eye size={20} />
                </div>
                <div className="text-2xl font-bold text-foreground">{formatNumber(story.views)}</div>
                <div className="text-sm text-muted-foreground">Lượt xem</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="flex items-center justify-center gap-2 text-accent mb-2">
                  <Heart size={20} />
                </div>
                <div className="text-2xl font-bold text-foreground">{formatNumber(story.likes)}</div>
                <div className="text-sm text-muted-foreground">Yêu thích</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Star size={20} />
                </div>
                <div className="text-2xl font-bold text-foreground">{story.rating}</div>
                <div className="text-sm text-muted-foreground">Đánh giá</div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {story.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                story.status === 'ongoing' ? 'bg-primary text-primary-foreground' :
                story.status === 'completed' ? 'bg-accent text-accent-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {story.status === 'ongoing' ? 'Đang ra' : 
                 story.status === 'completed' ? 'Hoàn thành' : 'Tạm dừng'}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-sans font-semibold text-xl mb-4">Tóm tắt</h2>
              <p className="text-muted-foreground leading-relaxed">
                {story.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                <Link to={`/truyen/${story.slug}/1`}>
                  <BookOpen size={20} className="mr-2" />
                  Đọc từ đầu
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Bookmark size={20} className="mr-2" />
                Thêm vào tủ truyện
              </Button>
            </div>
          </div>
        </div>

        {/* Chapter List */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-sans font-semibold text-xl mb-6">
              Danh sách chương ({story.chapters.length} chương)
            </h2>
            
            <div className="space-y-2">
              {story.chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/truyen/${story.slug}/${chapter.number}`}
                  className="block p-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">
                        Chương {chapter.number}: {chapter.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(chapter.publishedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Eye size={14} />
                      <span>{formatNumber(chapter.views)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StoryDetail;