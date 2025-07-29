import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Check, X, AlertTriangle, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockStories, mockUsers } from '@/data/mockData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock pending stories for approval
  const pendingStories = mockStories.slice(0, 2);
  
  const handleApprove = (storyId: string) => {
    console.log('Approved story:', storyId);
  };

  const handleReject = (storyId: string) => {
    console.log('Rejected story:', storyId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-sans font-bold text-3xl">Admin Dashboard</h1>
            <p className="text-muted-foreground">Quản lý nền tảng Library</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStories.length}</p>
                  <p className="text-sm text-muted-foreground">Tổng truyện</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Người dùng</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingStories.length}</p>
                  <p className="text-sm text-muted-foreground">Chờ duyệt</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatNumber(mockStories.reduce((sum, story) => sum + story.views, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Tổng lượt xem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <AlertTriangle size={16} />
              Chờ duyệt ({pendingStories.length})
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen size={16} />
              Quản lý truyện
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              Quản lý người dùng
            </TabsTrigger>
          </TabsList>

          {/* Pending Approval */}
          <TabsContent value="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">Truyện chờ duyệt</h2>
              <Badge variant="destructive">
                {pendingStories.length} cần xem xét
              </Badge>
            </div>

            {pendingStories.length > 0 ? (
              <div className="space-y-4">
                {pendingStories.map((story) => (
                  <Card key={story.id} className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-20 h-28 object-cover rounded flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-sans font-semibold text-lg mb-1">
                                {story.title}
                              </h3>
                              <p className="text-muted-foreground mb-2">
                                bởi {story.author}
                              </p>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {story.categories.map((category) => (
                                  <Badge key={category} variant="secondary" className="text-xs">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {story.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <Link to={`/truyen/${story.slug}`}>
                                  <Eye size={14} className="mr-1" />
                                  Xem
                                </Link>
                              </Button>
                              
                              <Button
                                size="sm"
                                onClick={() => handleApprove(story.id)}
                                className="bg-gradient-primary hover:opacity-90"
                              >
                                <Check size={14} className="mr-1" />
                                Duyệt
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(story.id)}
                              >
                                <X size={14} className="mr-1" />
                                Từ chối
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span>Ngày gửi: {new Date(story.lastUpdated).toLocaleDateString('vi-VN')}</span>
                            <span>{story.chapters.length} chương</span>
                            <Badge variant="outline" className="text-xs">
                              {story.status === 'ongoing' ? 'Đang ra' : 
                               story.status === 'completed' ? 'Hoàn thành' : 'Tạm dừng'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Check size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Không có truyện chờ duyệt</p>
                <p className="text-muted-foreground">Tất cả submission đã được xem xét</p>
              </div>
            )}
          </TabsContent>

          {/* Stories Management */}
          <TabsContent value="stories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">Quản lý truyện</h2>
              <Button variant="outline">
                Xuất báo cáo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockStories.map((story) => (
                <Card key={story.id} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full aspect-[3/4] object-cover rounded mb-3"
                    />
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{story.author}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{formatNumber(story.views)} views</span>
                      <Badge variant="outline" className="text-xs">
                        {story.status === 'ongoing' ? 'Đang ra' : 
                         story.status === 'completed' ? 'Hoàn thành' : 'Tạm dừng'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-xl">Quản lý người dùng</h2>
              <Button variant="outline">
                Xuất danh sách
              </Button>
            </div>

            <div className="space-y-4">
              {mockUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{user.username}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {user.storiesWritten} truyện
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatNumber(user.followers)} followers
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          {user.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;