import { useEffect, useState } from 'react';
import { Home, Library, BookMarked, User, Home as HomeIcon } from 'lucide-react';
import { Home as HomePage } from '../components/Home';
import { Library as LibraryPage } from '../components/Library';
import { ReadingList } from '../components/ReadingList';
import { Profile } from '../components/Profile';
import { BookDetail } from '../components/BookDetail';
import { ChapterReader } from '../components/ChapterReader';
import { CoinPurchase } from '../components/CoinPurchase';
import { mockBooks, mockUser } from '../data/mockData';
import { fetchBooks, fetchMe } from '../services/api';
import { Book, User as UserType } from '../types';

type Screen = 'home' | 'library' | 'reading-list' | 'profile' | 'book-detail' | 'chapter-reader';

export default function MockApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [showCoinPurchase, setShowCoinPurchase] = useState(false);
  const [user, setUser] = useState<UserType>(mockUser);
  const [books, setBooks] = useState<Book[]>(mockBooks);

  useEffect(() => {
    fetchMe().then(setUser).catch(() => {});
    fetchBooks().then(setBooks).catch(() => {});
  }, []);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('book-detail');
  };

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setCurrentScreen('chapter-reader');
  };

  const handleUnlockChapter = (chapterId: string) => {
    if (selectedBook) {
      const chapter = selectedBook.chapters.find((c) => c.id === chapterId);
      if (chapter && user.coins >= chapter.coinCost) {
        setUser({ ...user, coins: user.coins - chapter.coinCost });
        chapter.isPaid = false;
        handleChapterSelect(chapterId);
      }
    }
  };

  const handlePurchaseCoins = (coins: number, price: number) => {
    setUser({ ...user, coins: user.coins + coins });
    setShowCoinPurchase(false);
    alert(`Achat réussi! Vous avez reçu ${coins} pièces pour ${price} F CFA`);
  };

  const handleToggleVote = (chapterId: string, willLike: boolean) => {
    if (!selectedBook) return;
    // Update selectedBook
    const updatedChapters = selectedBook.chapters.map((c) =>
      c.id === chapterId
        ? { ...c, isLiked: willLike, likes: willLike ? c.likes + 1 : c.likes - 1 }
        : c
    );
    const updatedBook: Book = { ...selectedBook, chapters: updatedChapters };
    setSelectedBook(updatedBook);
    // Update books collection
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const handleBack = () => {
    if (currentScreen === 'chapter-reader') {
      setCurrentScreen('book-detail');
    } else if (currentScreen === 'book-detail') {
      setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    if (currentScreen === 'chapter-reader' && selectedBook && selectedChapterId) {
      const chapter = selectedBook.chapters.find((c) => c.id === selectedChapterId);
      if (chapter) {
        return (
          <ChapterReader
            chapter={chapter}
            bookTitle={selectedBook.title}
            bookCover={selectedBook.cover}
            onBack={handleBack}
            onToggleVote={handleToggleVote}
            chapters={selectedBook.chapters}
            onSelectChapter={(id) => {
              setSelectedChapterId(id);
              setCurrentScreen('chapter-reader');
            }}
          />
        );
      }
    }

    if (currentScreen === 'book-detail' && selectedBook) {
      return (
        <BookDetail
          book={selectedBook}
          userCoins={user.coins}
          onBack={handleBack}
          onChapterSelect={handleChapterSelect}
          onUnlockChapter={handleUnlockChapter}
        />
      );
    }

    switch (currentScreen) {
      case 'home':
        return <HomePage books={books} onBookSelect={handleBookSelect} />;
      case 'library':
        return <LibraryPage books={books} onBookSelect={handleBookSelect} />;
      case 'reading-list':
        return <ReadingList books={books} onBookSelect={handleBookSelect} />;
      case 'profile':
        return <Profile user={user} onBuyCoins={() => setShowCoinPurchase(true)} />;
      default:
        return <HomePage books={books} onBookSelect={handleBookSelect} />;
    }
  };

  const showTabBar = currentScreen !== 'book-detail' && currentScreen !== 'chapter-reader';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {renderScreen()}
        {showTabBar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
            <div className="max-w-md mx-auto flex justify-around items-center py-2">
              <TabButton
                icon={HomeIcon}
                label="Accueil"
                active={currentScreen === 'home'}
                onClick={() => setCurrentScreen('home')}
              />
              <TabButton
                icon={Library}
                label="Bibliothèque"
                active={currentScreen === 'library'}
                onClick={() => setCurrentScreen('library')}
              />
              <TabButton
                icon={BookMarked}
                label="Liste"
                active={currentScreen === 'reading-list'}
                onClick={() => setCurrentScreen('reading-list')}
              />
              <TabButton
                icon={User}
                label="Profil"
                active={currentScreen === 'profile'}
                onClick={() => setCurrentScreen('profile')}
              />
            </div>
          </div>
        )}

        {showCoinPurchase && (
          <CoinPurchase
            onClose={() => setShowCoinPurchase(false)}
            onPurchase={handlePurchaseCoins}
          />
        )}
      </div>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ icon: Icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
        active ? 'text-purple-600' : 'text-gray-400'
      }`}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{label}</span>
    </button>
  );
}


