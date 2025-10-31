import { useState } from 'react';
import { Chapter } from '../types';
import { ArrowLeft, Star, MessageCircle, Share2, MoreHorizontal, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChapterReaderProps {
  chapter: Chapter;
  bookTitle: string;
  onBack: () => void;
  onToggleVote?: (chapterId: string, willLike: boolean) => void;
  chapters?: Chapter[];
  onSelectChapter?: (chapterId: string) => void;
  bookCover?: string;
}

export function ChapterReader({ chapter, bookTitle, onBack, onToggleVote, chapters = [], onSelectChapter, bookCover }: ChapterReaderProps) {
  const [isLiked, setIsLiked] = useState(chapter.isLiked);
  const [likes, setLikes] = useState(chapter.likes);
  const [showComments, setShowComments] = useState(false);
  const [showChapterMenu, setShowChapterMenu] = useState(false);

  const handleLike = () => {
    const willLike = !isLiked;
    setIsLiked(willLike);
    setLikes(willLike ? likes + 1 : likes - 1);
    onToggleVote?.(chapter.id, willLike);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 mx-4 text-center">
            <p className="text-sm text-gray-600 truncate">{bookTitle}</p>
            <p className="text-xs text-gray-400">Chapitre {chapter.number}</p>
          </div>
          <button className="text-gray-700" onClick={() => setShowChapterMenu(true)} aria-label="Ouvrir le menu des chapitres">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chapter Image (Optional) */}
      {chapter.image && (
        <div className="w-full h-64">
          <ImageWithFallback
            src={chapter.image}
            alt={chapter.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Chapter Content */}
      <div className="px-6 py-6">
        <h1 className="mb-2">
          Chapitre {chapter.number}: {chapter.title}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {chapter.wordCount} mots • {(chapter.views ?? 0).toLocaleString()} vues
        </p>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{chapter.content}</p>
          
          {/* Mock longer content */}
          <p className="text-gray-700 leading-relaxed mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t px-6 py-4">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">{chapter.comments.length}</span>
          </button>
          <button
            onClick={handleLike}
            className={`flex flex-col items-center gap-1 ${
              isLiked ? 'text-yellow-500' : 'text-gray-600'
            }`}
          >
            <Star className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs">{likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-600">
            <Share2 className="w-6 h-6" />
            <span className="text-xs">Partager</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setShowComments(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <h3>Commentaires ({chapter.comments.length})</h3>
            </div>
            <div className="px-6 py-6">
              <textarea
                className="w-full border rounded-lg p-3 resize-none"
                rows={3}
                placeholder="Ajouter un commentaire..."
              />
              <button className="mt-3 bg-purple-600 text-white rounded-lg px-6 py-2">
                Publier
              </button>
              {chapter.comments.length === 0 && (
                <p className="text-center text-gray-400 mt-8">Aucun commentaire pour le moment</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Left Drawer: Chapters Menu */}
      {showChapterMenu && (
        <div className="fixed inset-0 z-30" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowChapterMenu(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white shadow-2xl overflow-y-auto">
            <div className="px-4 py-4 border-b flex items-center gap-3 shadow-sm">
              {bookCover && (
                <img src={bookCover} alt={bookTitle} className="w-8 h-12 rounded object-cover flex-shrink-0" />
              )}
              <div className="min-w-0 text-left flex items-center">
                <div>
                  <h3 className="truncate text-xl font-medium text-gray-600">{bookTitle}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">Tous les chapitres</p>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-2">
              {chapters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectChapter?.(c.id);
                    setShowChapterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-4 hover:bg-gray-50 focus:bg-gray-50 transition-colors ${
                    c.id === chapter.id ? 'bg-gray-100 ring-1 ring-gray-200' : ''
                  }`}
                >
                  {bookCover && (
                    <div className="relative flex-shrink-0">
                      <img src={bookCover} alt={bookTitle} className="w-8 h-10 rounded-md object-cover" />
                      {c.isPaid && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left flex items-center">
                    <p className="truncate text-lg font-medium text-gray-600 leading-snug">{c.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
