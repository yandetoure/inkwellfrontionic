import { User } from '../types';
import { Plus, Coins, BookOpen, Settings, Bell, HelpCircle, LogOut, Edit3 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileProps {
  user: User;
  onBuyCoins: () => void;
}

export function Profile({ user, onBuyCoins }: ProfileProps) {
  return (
    <div className="pb-20">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 pt-12 pb-20"></div>

      {/* Profile Card */}
      <div className="px-6 -mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 shadow-lg">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="mt-3">{user.name}</h2>
          </div>

          {/* Coins Section */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90">Mes Pièces</p>
                  <p className="text-2xl">{user.coins}</p>
                </div>
              </div>
              <button
                onClick={onBuyCoins}
                className="bg-white text-orange-600 rounded-lg px-4 py-2 flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Plus className="w-5 h-5" />
                <span>Acheter</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-gray-500 text-sm">Livres écrits</p>
              <p className="text-2xl mt-1">{user.booksWritten}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-gray-500 text-sm">Livres lus</p>
              <p className="text-2xl mt-1">12</p>
            </div>
          </div>
        </div>

        {/* Writer Section */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3">
              <Edit3 className="w-6 h-6" />
              <span>Voir mon espace écrivain</span>
            </div>
            <span className="text-2xl">→</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
          <MenuItem icon={Settings} text="Paramètres" />
          <MenuItem icon={Bell} text="Notifications" />
          <MenuItem icon={HelpCircle} text="Aide et Support" />
          <MenuItem icon={LogOut} text="Déconnexion" isLast />
        </div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ElementType;
  text: string;
  isLast?: boolean;
}

function MenuItem({ icon: Icon, text, isLast = false }: MenuItemProps) {
  return (
    <button
      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
        !isLast ? 'border-b' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <span>{text}</span>
      </div>
      <span className="text-gray-400">→</span>
    </button>
  );
}
