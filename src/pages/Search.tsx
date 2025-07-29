import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { searchStories, mockStories, categories } from '@/data/mockData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('views');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  // Get filtered results
  const getFilteredResults = () => {
    let results = query ? searchStories(query) : mockStories;

    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter(story => 
        story.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      results = results.filter(story => story.status === selectedStatus);
    }

    // Sort results
    switch (sortBy) {
      case 'likes':
        results.sort((a, b) => b.likes - a.likes);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'updated':
        results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      default:
        results.sort((a, b) => b.views - a.views);
    }

    return results;
  };

  const filteredStories = getFilteredResults();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-sans font-bold text-3xl md:text-4xl mb-6">
            {query ? `Kết quả tìm kiếm: "${query}"` : 'Tìm kiếm truyện'}
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm truyện, tác giả..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                Tìm kiếm
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="mr-2" />
                Bộ lọc
              </Button>
            </div>
          </form>

          {/* Filters */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-sans font-semibold mb-4">Thể loại</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={category}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="font-sans font-semibold mb-4">Trạng thái</h3>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="ongoing">Đang ra</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                        <SelectItem value="hiatus">Tạm dừng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="font-sans font-semibold mb-4">Sắp xếp theo</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sắp xếp theo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="views">Lượt xem</SelectItem>
                        <SelectItem value="likes">Yêu thích</SelectItem>
                        <SelectItem value="rating">Đánh giá</SelectItem>
                        <SelectItem value="updated">Cập nhật</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedStatus('all');
                      setSortBy('views');
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans font-semibold text-xl">
              Tìm thấy {filteredStories.length} kết quả
            </h2>
          </div>

          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <SearchIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Không tìm thấy kết quả nào</p>
                <p className="text-sm">Thử thay đổi từ khóa hoặc bộ lọc</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;