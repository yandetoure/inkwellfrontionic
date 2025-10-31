import { useState, useEffect, useRef } from 'react';
import { Book, Author } from '../types';
import { BookCard } from './BookCard';
import { heroSlides, categories, mockAuthors } from '../data/mockData';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

export function Home({ books, onBookSelect }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const recommendedBooks = books.slice(0, 6);
  const popularBooks = books.sort((a, b) => b.totalLikes - a.totalLikes).slice(0, 6);
  const romanceBooks = books.filter((b) => b.category === 'Romance');
  const darkBooks = books.filter((b) => ['Trahison', 'Thriller', 'Mystère'].includes(b.category));

  return (
    <div className="pb-20 bg-gradient-to-b from-purple-50/30 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white mb-3 max-w-md"
          >
            {heroSlides[currentSlide].title}
          </motion.h1>
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 max-w-md"
          >
            {heroSlides[currentSlide].description}
          </motion.p>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur text-white rounded-full p-2 hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur text-white rounded-full p-2 hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-6 py-6 -mt-6 relative z-10">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === category.id ? null : category.id)
              }
              className={`flex-shrink-0 px-5 py-2.5 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Books by Category */}
      {selectedCategory && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="px-6 py-6 bg-gradient-to-r from-purple-100 to-pink-100 border-y border-purple-200"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-purple-900">
              {categories.find((c) => c.id === selectedCategory)?.icon}{' '}
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-purple-600 text-sm hover:underline"
            >
              Fermer
            </button>
          </div>
          <HorizontalBookScroll
            books={books.filter(
              (b) => b.category === categories.find((c) => c.id === selectedCategory)?.name
            )}
            onBookSelect={onBookSelect}
          />
          {books.filter((b) => b.category === categories.find((c) => c.id === selectedCategory)?.name)
            .length === 0 && (
            <p className="text-center text-purple-600 py-8">
              Aucun livre dans cette catégorie pour le moment
            </p>
          )}
        </motion.section>
      )}

      {/* Recommended Section */}
      <section className="px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-purple-600" />
            <h2 className="text-purple-900">Recommandés pour vous</h2>
          </div>
          <button className="text-purple-600 text-sm hover:underline">Voir tout</button>
        </div>
        <HorizontalBookScroll books={recommendedBooks} onBookSelect={onBookSelect} />
      </section>

      {/* Popular Section */}
      <section className="px-6 py-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-pink-600" />
            <h2 className="text-purple-900">Les plus lus du moment 📈</h2>
          </div>
          <button className="text-pink-600 text-sm hover:underline">Voir tout</button>
        </div>
        <HorizontalBookScroll books={popularBooks} onBookSelect={onBookSelect} />
      </section>

      {/* Featured Authors Section */}
      <section className="px-6 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-purple-900">Auteurs Vedettes ✨</h2>
          <button className="text-purple-600 text-sm hover:underline">Voir tout</button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {mockAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} onBookSelect={onBookSelect} />
          ))}
        </div>
      </section>

      {/* Romance Section */}
      <section className="px-6 py-8 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-rose-900">Histoires d'amour 💕</h2>
          <button className="text-rose-600 text-sm hover:underline">Voir tout</button>
        </div>
        <HorizontalBookScroll books={romanceBooks} onBookSelect={onBookSelect} />
      </section>

      {/* Dark/Thriller Section */}
      <section className="px-6 py-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white">Trahison & Secrets 😈</h2>
          <button className="text-purple-300 text-sm hover:underline">Voir tout</button>
        </div>
        <HorizontalBookScroll books={darkBooks} onBookSelect={onBookSelect} dark />
      </section>

      {/* Writer CTA Section */}
      <section className="mx-6 my-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 text-white text-center shadow-2xl">
        <Edit3 className="w-12 h-12 mx-auto mb-4" />
        <h2 className="mb-3">Devenez Auteur</h2>
        <p className="mb-6 text-white/90">
          Partagez vos histoires avec des milliers de lecteurs passionnés
        </p>
        <button className="bg-white text-purple-900 px-8 py-3 rounded-full hover:bg-purple-50 transition-colors shadow-lg">
          Commencer à écrire
        </button>
      </section>
    </div>
  );
}

// Horizontal Book Scroll Component
interface HorizontalBookScrollProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
  dark?: boolean;
}

function HorizontalBookScroll({ books, onBookSelect, dark = false }: HorizontalBookScrollProps) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
      {books.map((book) => (
        <div key={book.id} className="flex-shrink-0 w-36">
          <div
            onClick={() => onBookSelect(book)}
            className="cursor-pointer group"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-105 duration-300">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-52 object-cover"
              />
              {book.isPaid && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                  Premium
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-2">
              <h3 className={`text-sm line-clamp-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                {book.title}
              </h3>
              <p className={`text-xs mt-1 ${dark ? 'text-gray-300' : 'text-gray-500'}`}>
                {book.author}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Star className={`w-3 h-3 ${dark ? 'text-yellow-400' : 'text-yellow-500'} fill-current`} />
                <span className={`text-xs ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {book.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Author Card Component
interface AuthorCardProps {
  author: Author;
  onBookSelect: (book: Book) => void;
}

function AuthorCard({ author, onBookSelect }: AuthorCardProps) {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-purple-100">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
        />
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-purple-900">{author.name}</h3>
          <p className="text-xs text-gray-500">{author.bio}</p>
        </div>
      </div>
      <div className="flex gap-4 text-xs text-gray-600 mb-4">
        <div>
          <span className="text-purple-600">{author.totalBooks}</span> livres
        </div>
        <div>
          <span className="text-purple-600">{(author.totalReads / 1000).toFixed(0)}k</span>{' '}
          lectures
        </div>
      </div>
      {author.topBook && (
        <div onClick={() => onBookSelect(author.topBook!)} className="cursor-pointer">
          <div className="flex gap-3 bg-purple-50 rounded-xl p-3 hover:bg-purple-100 transition-colors">
            <img
              src={author.topBook.cover}
              alt={author.topBook.title}
              className="w-12 h-16 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">Top livre</p>
              <p className="text-sm line-clamp-2 text-purple-900">{author.topBook.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
