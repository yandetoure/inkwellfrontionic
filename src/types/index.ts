export interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
  wordCount: number;
  views?: number;
  image?: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isPaid: boolean;
  coinCost: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  cover: string;
  description: string;
  chapters: Chapter[];
  totalLikes: number;
  isPaid: boolean;
  freeChaptersCount: number;
  category: string;
  rating: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  booksWritten: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  totalBooks: number;
  totalReads: number;
  topBook?: Book;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  ctaText: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
