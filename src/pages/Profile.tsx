import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, BookOpen, Users, Heart, Clock, Settings, Plus } from 'lucide-react';
import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getUserById, mockStories, getStoryById } from '@/data/mockData';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState('stories');
  
  const user = userId ? getUserById(userId) : null;
  const userStories = mockStories.filter(story => story.authorId === userId);
  
  // For demo, assume current user is 'author1'
  const isOwnProfile = userId === 'author1';

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy người dùng</h1>
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
        {/* Profile Header */}
        <Card className="mb-8 shadow-elegant">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
                {isOwnProfile && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10"
                  >
                    <Settings size={16} />
                  </Button>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-sans font-bold text-3xl mb-2">{user.username}</h1>
                <p className="text-muted-foreground mb-4 max-w-md">{user.bio}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{formatNumber(user.storiesWritten)}</div>
                    <div className="text-sm text-muted-foreground">Truyện đăng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{formatNumber(user.followers)}</div>
                    <div className="text-sm text-muted-foreground">Người theo dõi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{formatNumber(user.following)}</div>
                    <div className="text-sm text-muted-foreground">Đang theo dõi</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {isOwnProfile ? (
                    <>
                      <Button asChild className="bg-gradient-primary hover:opacity-90">
                        <Link to="/author/stories/edit/new">
                          <Plus size={16} className="mr-2" />
                          Đăng truyện mới
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/profile/edit">
                          <Settings size={16} className="mr-2" />
                          Chỉnh sửa hồ sơ
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <Users size={16} className="mr-2" />
                      Theo dõi
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen size={16} />
              Truyện Đã Đăng
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Heart size={16} />
              Tủ Truyện
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock size={16} />
              Lịch Sử Đọc
            </TabsTrigger>
          </TabsList>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">
                Truyện đã đăng ({userStories.length})
              </h2>
              {isOwnProfile && (
                <Button asChild variant="outline">
                  <Link to="/author/dashboard">
                    Quản lý truyện
                  </Link>
                </Button>
              )}
            </div>

            {userStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {userStories.map((story) => (
                  <StoryCard key={story.id} story={story} showAuthor={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-2">Chưa có truyện nào</p>
                {isOwnProfile && (
                  <Button asChild className="bg-gradient-primary hover:opacity-90">
                    <Link to="/author/stories/edit/new">
                      Đăng truyện đầu tiên
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <h2 className="font-sans font-semibold text-xl">
              Tủ truyện ({user.bookmarks.length})
            </h2>

            {user.bookmarks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {user.bookmarks.map((storyId) => {
                  const story = getStoryById(storyId);
                  return story ? (
                    <StoryCard key={story.id} story={story} />
                  ) : null;
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-2">Chưa có truyện yêu thích</p>
                <p className="text-muted-foreground">Thêm truyện vào tủ để đọc sau</p>
              </div>
            )}
          </TabsContent>

          {/* Reading History Tab */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="font-sans font-semibold text-xl">
              Lịch sử đọc ({user.readingHistory.length})
            </h2>

            {user.readingHistory.length > 0 ? (
              <div className="space-y-4">
                {user.readingHistory.map((item, index) => {
                  const story = getStoryById(item.storyId);
                  if (!story) return null;

                  return (
                    <Card key={index} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={story.coverImage}
                            alt={story.title}
                            className="w-16 h-20 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/truyen/${story.slug}`}
                              className="font-sans font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                            >
                              {story.title}
                            </Link>
                            <p className="text-muted-foreground">{story.author}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">
                                Chương {item.chapterNumber}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(item.readAt).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                          </div>
                          <Button asChild variant="outline">
                            <Link to={`/truyen/${story.slug}/${item.chapterNumber}`}>
                              Tiếp tục đọc
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-2">Chưa có lịch sử đọc</p>
                <p className="text-muted-foreground">Bắt đầu đọc truyện để xem lịch sử</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;