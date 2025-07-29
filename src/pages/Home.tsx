import { Header } from '@/components/Header';
import { HeroCarousel } from '@/components/HeroCarousel';
import { StoryShelf } from '@/components/StoryShelf';
import { mockStories, getTopStoriesByViews, getTopStoriesByLikes } from '@/data/mockData';

const Home = () => {
  // Get different story collections
  const recentlyUpdated = [...mockStories].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  const topViewed = getTopStoriesByViews();
  const recommended = getTopStoriesByLikes();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <HeroCarousel />
        </section>

        {/* Story Shelves */}
        <StoryShelf 
          title="Truyện Mới Cập Nhật" 
          stories={recentlyUpdated} 
        />
        
        <StoryShelf 
          title="Top Lượt Xem" 
          stories={topViewed} 
        />
        
        <StoryShelf 
          title="Được Đề Cử" 
          stories={recommended} 
        />

        {/* Additional Content Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-6">
              Khám phá thế giới truyện
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Tham gia cộng đồng đọc truyện lớn nhất Việt Nam. Khám phá hàng ngàn tác phẩm 
              từ các thể loại huyền huyễn, tu tiên, võ hiệp đến đô thị, lịch sử.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1M+</span>
                </div>
                <h3 className="font-sans font-semibold text-lg mb-2">Lượt đọc</h3>
                <p className="text-muted-foreground">Hàng triệu lượt đọc mỗi tháng</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">10K+</span>
                </div>
                <h3 className="font-sans font-semibold text-lg mb-2">Tác phẩm</h3>
                <p className="text-muted-foreground">Hàng nghìn tác phẩm chất lượng</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">24/7</span>
                </div>
                <h3 className="font-sans font-semibold text-lg mb-2">Cập nhật</h3>
                <p className="text-muted-foreground">Cập nhật chương mới liên tục</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;