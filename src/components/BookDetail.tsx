import { Book } from '../types';
import { ArrowLeft, Heart, Share2, Bookmark, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookDetailProps {
  book: Book;
  userCoins: number;
  onBack: () => void;
  onChapterSelect: (chapterId: string) => void;
  onUnlockChapter: (chapterId: string) => void;
}

export function BookDetail({
  book,
  userCoins,
  onBack,
  onChapterSelect,
  onUnlockChapter,
}: BookDetailProps) {
  return (
    <div className="pb-20">
      {/* Header with Back Button */}
      <div className="relative h-[400px]">
        <ImageWithFallback
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 bg-black/30 backdrop-blur text-white rounded-full p-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="mb-2">{book.title}</h1>
          <p className="text-white/90 mb-3">{book.author}</p>
          <p className="text-sm text-white/80">{book.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 px-6 py-4 bg-white border-b">
        <button className="flex-1 bg-purple-600 text-white rounded-lg py-3 flex items-center justify-center gap-2">
          <span>Commencer la lecture</span>
        </button>
        <button className="bg-gray-100 text-gray-700 rounded-lg p-3">
          <Heart className="w-6 h-6" />
        </button>
        <button className="bg-gray-100 text-gray-700 rounded-lg p-3">
          <Bookmark className="w-6 h-6" />
        </button>
        <button className="bg-gray-100 text-gray-700 rounded-lg p-3">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Premium Info */}
      {book.isPaid && (
        <div className="mx-6 mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm">
                <span className="text-yellow-900">
                  Les {book.freeChaptersCount} premiers chapitres sont gratuits.
                </span>
                <br />
                <span className="text-gray-600">
                  Les chapitres suivants coûtent 5 pièces chacun.
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chapters List */}
      <div className="px-6 py-6">
        <h2 className="mb-4">Chapitres ({book.chapters.length})</h2>
        <div className="space-y-3">
          {book.chapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => {
                if (chapter.isPaid) {
                  if (userCoins >= chapter.coinCost) {
                    onUnlockChapter(chapter.id);
                  } else {
                    alert('Pièces insuffisantes');
                  }
                } else {
                  onChapterSelect(chapter.id);
                }
              }}
              className="bg-white rounded-xl p-4 border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  {chapter.isPaid ? (
                    <Lock className="w-6 h-6 text-purple-600" />
                  ) : (
                    <span className="text-purple-600">{chapter.number}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="truncate">
                        Chapitre {chapter.number}: {chapter.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{chapter.wordCount} mots</p>
                    </div>
                    {chapter.isPaid && (
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm flex-shrink-0">
                        <span>{chapter.coinCost}</span>
                        <span>🪙</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {chapter.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
