import { Link } from 'react-router-dom';
import { Eye, Heart, Star } from 'lucide-react';
import { Story } from '@/data/mockData';

interface StoryCardProps {
  story: Story;
  showAuthor?: boolean;
  className?: string;
}

export const StoryCard = ({ story, showAuthor = true, className = '' }: StoryCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}>
      <Link to={`/truyen/${story.slug}`} className="block">
        <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elegant">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Status badge */}
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                story.status === 'ongoing' ? 'bg-primary text-primary-foreground' :
                story.status === 'completed' ? 'bg-accent text-accent-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {story.status === 'ongoing' ? 'Đang ra' : 
                 story.status === 'completed' ? 'Hoàn thành' : 'Tạm dừng'}
              </span>
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{formatNumber(story.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={12} />
                  <span>{formatNumber(story.likes)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  <span>{story.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-sans font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {story.title}
            </h3>
            
            {showAuthor && (
              <p className="text-sm text-muted-foreground mb-2">
                {story.author}
              </p>
            )}

            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {story.description}
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 mb-3">
              {story.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                >
                  {category}
                </span>
              ))}
              {story.categories.length > 2 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                  +{story.categories.length - 2}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{formatNumber(story.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={12} />
                  <span>{formatNumber(story.likes)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} />
                <span>{story.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};