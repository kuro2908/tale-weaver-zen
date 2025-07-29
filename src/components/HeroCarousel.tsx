import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedStories } from '@/data/mockData';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredStories = getFeaturedStories();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredStories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredStories.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredStories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!featuredStories.length) return null;

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-gradient-hero">
      {/* Slides */}
      <div className="relative h-full">
        {featuredStories.map((story, index) => (
          <div
            key={story.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 text-sm bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h1 className="font-sans font-bold text-3xl md:text-5xl mb-4 leading-tight">
                    {story.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-4 font-medium">
                    bởi {story.author}
                  </p>

                  <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed">
                    {story.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-8 text-white/70">
                    <div className="flex items-center gap-2">
                      <Eye size={18} />
                      <span>{formatNumber(story.views)} lượt xem</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart size={18} />
                      <span>{formatNumber(story.likes)} yêu thích</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={18} />
                      <span>{story.rating} đánh giá</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8">
                      <Link to={`/truyen/${story.slug}`}>
                        Đọc ngay
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8">
                      <Link to={`/truyen/${story.slug}`}>
                        Xem chi tiết
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredStories.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};