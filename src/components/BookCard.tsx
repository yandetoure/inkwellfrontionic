import { Book } from '../types';
import { Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <ImageWithFallback
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        {book.isPaid && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
            Premium
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="truncate">{book.title}</h3>
        <p className="text-gray-500 text-sm">{book.author}</p>
        <div className="flex items-center gap-1 mt-1 text-gray-400 text-sm">
          <Heart className="w-4 h-4" />
          <span>{book.totalLikes}</span>
        </div>
      </div>
    </div>
  );
}
