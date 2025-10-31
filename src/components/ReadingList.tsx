import { Book } from '../types';
import { BookCard } from './BookCard';
import { Bookmark } from 'lucide-react';

interface ReadingListProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

export function ReadingList({ books, onBookSelect }: ReadingListProps) {
  const readingList = books.slice(0, 2);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
        <h1>Liste de Lecture</h1>
        <p className="text-sm text-white/90 mt-1">{readingList.length} livres sauvegardés</p>
      </div>

      {/* Empty State or Books */}
      {readingList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="mb-2">Aucun livre dans votre liste</h2>
          <p className="text-gray-500">
            Ajoutez des livres à votre liste de lecture pour les retrouver facilement
          </p>
        </div>
      ) : (
        <div className="px-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            {readingList.map((book) => (
              <BookCard key={book.id} book={book} onClick={() => onBookSelect(book)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
