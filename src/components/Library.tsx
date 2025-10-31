import { Book } from '../types';
import { BookCard } from './BookCard';
import { BookOpen, Clock, Download } from 'lucide-react';

interface LibraryProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

export function Library({ books, onBookSelect }: LibraryProps) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h1>Ma Bibliothèque</h1>
        <p className="text-sm text-white/90 mt-1">{books.length} livres</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 py-4 bg-white border-b sticky top-0 z-10">
        <button className="flex items-center gap-2 pb-2 border-b-2 border-purple-600 text-purple-600">
          <BookOpen className="w-5 h-5" />
          <span>Tous</span>
        </button>
        <button className="flex items-center gap-2 pb-2 text-gray-500">
          <Clock className="w-5 h-5" />
          <span>En cours</span>
        </button>
        <button className="flex items-center gap-2 pb-2 text-gray-500">
          <Download className="w-5 h-5" />
          <span>Téléchargés</span>
        </button>
      </div>

      {/* Books Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => onBookSelect(book)} />
          ))}
        </div>
      </div>
    </div>
  );
}
