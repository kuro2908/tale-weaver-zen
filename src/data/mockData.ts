// Mock data for the web novel platform

export interface Story {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  coverImage: string;
  categories: string[];
  status: 'ongoing' | 'completed' | 'hiatus';
  views: number;
  likes: number;
  rating: number;
  chapters: Chapter[];
  lastUpdated: string;
  featured?: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
  publishedAt: string;
  views: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  storiesWritten: number;
  followers: number;
  following: number;
  bookmarks: string[];
  readingHistory: ReadingHistoryItem[];
}

export interface ReadingHistoryItem {
  storyId: string;
  chapterNumber: number;
  readAt: string;
}

// Sample chapter content
const sampleChapterContent = `
Trời đã tối mịt, ánh trăng lơ lửng trong đêm đen như mực. Lâm Phong đứng trên đỉnh núi, nhìn xuống thành phố xa xa phía dưới, những ánh đèn lấp lánh như những vì sao rơi xuống trần gian.

"Sau bao năm tu luyện, cuối cùng ta cũng đạt được cảnh giới Nguyên Anh," anh thầm nghĩ, cảm nhận luồng chân khí mạnh mẽ chảy trong kinh mạch.

Đột nhiên, một luồng sát khí lạnh lẽo ập đến từ phía sau. Lâm Phong nhanh chóng quay người, chỉ thấy một bóng đen như ma quỷ đang lao thẳng về phía mình.

"Ai đó dám tấn công ta?" 

Mà không chần chừ, Lâm Phong vung tay, một đạo kiếm khí sắc bén bay thẳng về phía kẻ địch. Không gian dường như bị cắt đôi bởi sức mạnh khủng khiếp của chiêu thức này.

Bóng đen né tránh khéo léo, tiếng cười khan khàn vang lên: "Quả nhiên là thiên tài của Linh Vân Tông, công lực đã tiến bộ không ít. Nhưng so với ta, ngươi vẫn còn kém xa!"

Trận chiến khốc liệt bắt đầu. Trên đỉnh núi hoang vu, hai bóng người lao vào nhau với tốc độ nhanh như chớp, mỗi đòn đều chứa đựng sức mạnh có thể phá hủy núi non...
`;

export const mockStories: Story[] = [
  {
    id: '1',
    slug: 'than-doc-dan-duong',
    title: 'Thần Độc Đan Đường',
    author: 'Thiên Tằm Thổ Đậu',
    authorId: 'author1',
    description: 'Đường Tam thiếu gia, Thần Độc đan đường độc nhất vô nhị đích thiên tài, được mọi người khiếp sợ đích Du độc chi vương. Tại một lần ý ngoại trung, trọng sinh thành vi một cái bình thường đích nam hài...',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    categories: ['Huyền Huyễn', 'Tu Tiên'],
    status: 'ongoing',
    views: 1250000,
    likes: 45000,
    rating: 4.8,
    lastUpdated: '2024-01-15',
    featured: true,
    chapters: [
      {
        id: 'ch1',
        number: 1,
        title: 'Trọng sinh',
        content: sampleChapterContent,
        publishedAt: '2024-01-01',
        views: 125000
      },
      {
        id: 'ch2',
        number: 2,
        title: 'Thần Độc đan đường',
        content: sampleChapterContent,
        publishedAt: '2024-01-02',
        views: 120000
      }
    ]
  },
  {
    id: '2',
    slug: 'dau-pha-thuong-khung',
    title: 'Đấu Phá Thương Khung',
    author: 'Thiên Tằm Thổ Đậu',
    authorId: 'author1',
    description: 'Này là một cái thuộc về Đấu Khí đích thế giới, không có hoa tiếu đích ma pháp, có đích, chỉ là bội tăng đến đỉnh phong đích Đấu Khí!',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    categories: ['Huyền Huyễn', 'Đấu Khí'],
    status: 'completed',
    views: 2800000,
    likes: 95000,
    rating: 4.9,
    lastUpdated: '2023-12-20',
    featured: true,
    chapters: [
      {
        id: 'ch1-2',
        number: 1,
        title: 'Thiên tài phế vật',
        content: sampleChapterContent,
        publishedAt: '2023-01-01',
        views: 280000
      }
    ]
  },
  {
    id: '3',
    slug: 'vo-dong-thien-ha',
    title: 'Võ Động Thiên Hạ',
    author: 'Động Tác',
    authorId: 'author2',
    description: 'Tu luyện một đạo, tiên thiên hạ chi ưu nhi ưu, hậu thiên hạ chi lạc nhi lạc. Duy có như thử, phương khả thành thánh thành hiền...',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    categories: ['Võ Hiệp', 'Tu Tiên'],
    status: 'ongoing',
    views: 980000,
    likes: 32000,
    rating: 4.6,
    lastUpdated: '2024-01-14',
    chapters: [
      {
        id: 'ch1-3',
        number: 1,
        title: 'Khởi đầu tu luyện',
        content: sampleChapterContent,
        publishedAt: '2024-01-01',
        views: 98000
      }
    ]
  },
  {
    id: '4',
    slug: 'linh-vu-thien-ha',
    title: 'Linh Vũ Thiên Hạ',
    author: 'Phong Thanh Dương',
    authorId: 'author3',
    description: 'Một thiếu niên từ thế giới hiện đại xuyên việt đến dị giới, mang theo hệ thống thần kỳ, bước lên con đường trở thành cường giả...',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    categories: ['Huyền Huyễn', 'Xuyên Việt'],
    status: 'ongoing',
    views: 760000,
    likes: 28000,
    rating: 4.5,
    lastUpdated: '2024-01-13',
    featured: true,
    chapters: [
      {
        id: 'ch1-4',
        number: 1,
        title: 'Xuyên việt dị giới',
        content: sampleChapterContent,
        publishedAt: '2024-01-01',
        views: 76000
      }
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: 'author1',
    username: 'Thiên Tằm Thổ Đậu',
    email: 'thientam@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    bio: 'Tác giả nổi tiếng với nhiều tác phẩm huyền huyễn kinh điển',
    storiesWritten: 12,
    followers: 125000,
    following: 45,
    bookmarks: ['3', '4'],
    readingHistory: [
      { storyId: '3', chapterNumber: 15, readAt: '2024-01-15' }
    ]
  },
  {
    id: 'author2',
    username: 'Động Tác',
    email: 'dongtac@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'Chuyên viết truyện võ hiệp và tu tiên',
    storiesWritten: 8,
    followers: 68000,
    following: 32,
    bookmarks: ['1', '2'],
    readingHistory: []
  },
  {
    id: 'author3',
    username: 'Phong Thanh Dương',
    email: 'phongthanh@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    bio: 'Tác giả trẻ với nhiều ý tưởng sáng tạo',
    storiesWritten: 5,
    followers: 34000,
    following: 28,
    bookmarks: ['1'],
    readingHistory: []
  }
];

export const categories = [
  'Huyền Huyễn',
  'Tu Tiên',
  'Võ Hiệp',
  'Đấu Khí',
  'Xuyên Việt',
  'Đô Thị',
  'Lịch Sử',
  'Quân Sự',
  'Game',
  'Khoa Huyễn'
];

// Helper functions
export const getStoryById = (id: string): Story | undefined => {
  return mockStories.find(story => story.id === id);
};

export const getStoryBySlug = (slug: string): Story | undefined => {
  return mockStories.find(story => story.slug === slug);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getFeaturedStories = (): Story[] => {
  return mockStories.filter(story => story.featured);
};

export const getStoriesByCategory = (category: string): Story[] => {
  return mockStories.filter(story => story.categories.includes(category));
};

export const searchStories = (query: string): Story[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockStories.filter(story => 
    story.title.toLowerCase().includes(lowercaseQuery) ||
    story.author.toLowerCase().includes(lowercaseQuery) ||
    story.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getTopStoriesByViews = (): Story[] => {
  return [...mockStories].sort((a, b) => b.views - a.views);
};

export const getTopStoriesByRating = (): Story[] => {
  return [...mockStories].sort((a, b) => b.rating - a.rating);
};

export const getTopStoriesByLikes = (): Story[] => {
  return [...mockStories].sort((a, b) => b.likes - a.likes);
};