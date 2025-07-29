import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Eye, Heart, Star, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getTopStoriesByViews, getTopStoriesByLikes, getTopStoriesByRating } from '@/data/mockData';

const Rankings = () => {
  const [activeTab, setActiveTab] = useState('views');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Crown className={`w-5 h-5 ${getRankColor(rank)}`} />;
    }
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
  };

  const topViewedStories = getTopStoriesByViews();
  const topLikedStories = getTopStoriesByLikes();
  const topRatedStories = getTopStoriesByRating();

  const renderStoryList = (stories: any[], type: 'views' | 'likes' | 'rating') => {
    return (
      <div className="space-y-4">
        {stories.map((story, index) => {
          const rank = index + 1;
          return (
            <Card key={story.id} className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    {getRankIcon(rank)}
                  </div>

                  {/* Cover Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                  </div>

                  {/* Story Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          to={`/truyen/${story.slug}`}
                          className="font-sans font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                        >
                          {story.title}
                        </Link>
                        <Link
                          to={`/profile/${story.authorId}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {story.author}
                        </Link>
                        
                        {/* Categories */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {story.categories.slice(0, 3).map((category: string) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Main Stat */}
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2 text-primary">
                          {type === 'views' && <Eye size={18} />}
                          {type === 'likes' && <Heart size={18} />}
                          {type === 'rating' && <Star size={18} />}
                          <span className="font-bold text-lg">
                            {type === 'views' && formatNumber(story.views)}
                            {type === 'likes' && formatNumber(story.likes)}
                            {type === 'rating' && story.rating}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {type === 'views' && 'lượt xem'}
                          {type === 'likes' && 'yêu thích'}
                          {type === 'rating' && 'đánh giá'}
                        </div>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      {type !== 'views' && (
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{formatNumber(story.views)}</span>
                        </div>
                      )}
                      {type !== 'likes' && (
                        <div className="flex items-center gap-1">
                          <Heart size={14} />
                          <span>{formatNumber(story.likes)}</span>
                        </div>
                      )}
                      {type !== 'rating' && (
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          <span>{story.rating}</span>
                        </div>
                      )}
                      <Badge variant={
                        story.status === 'ongoing' ? 'default' :
                        story.status === 'completed' ? 'secondary' :
                        'outline'
                      } className="text-xs">
                        {story.status === 'ongoing' ? 'Đang ra' : 
                         story.status === 'completed' ? 'Hoàn thành' : 'Tạm dừng'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="font-sans font-bold text-3xl md:text-4xl">Bảng xếp hạng</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Những tác phẩm được yêu thích nhất trên nền tảng
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="views" className="flex items-center gap-2">
              <Eye size={16} />
              Top Lượt Xem
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex items-center gap-2">
              <Heart size={16} />
              Top Yêu Thích
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex items-center gap-2">
              <Star size={16} />
              Top Đánh Giá
            </TabsTrigger>
          </TabsList>

          <TabsContent value="views" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">Top truyện có lượt xem cao nhất</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <Eye size={14} />
                Cập nhật hàng ngày
              </Badge>
            </div>
            {renderStoryList(topViewedStories, 'views')}
          </TabsContent>

          <TabsContent value="likes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">Top truyện được yêu thích nhất</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <Heart size={14} />
                Cập nhật hàng ngày
              </Badge>
            </div>
            {renderStoryList(topLikedStories, 'likes')}
          </TabsContent>

          <TabsContent value="rating" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">Top truyện có đánh giá cao nhất</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star size={14} />
                Cập nhật hàng ngày
              </Badge>
            </div>
            {renderStoryList(topRatedStories, 'rating')}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card>
            <CardContent className="p-8">
              <h3 className="font-sans font-bold text-2xl mb-4">Bạn cũng là tác giả?</h3>
              <p className="text-muted-foreground mb-6">
                Chia sẻ tác phẩm của bạn và cùng cạnh tranh trong bảng xếp hạng
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                <Link to="/author/stories/edit/new">
                  Đăng truyện ngay
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Rankings;