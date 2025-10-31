import { X, Coins, Check } from 'lucide-react';

interface CoinPurchaseProps {
  onClose: () => void;
  onPurchase: (coins: number, price: number) => void;
}

interface CoinPackage {
  coins: number;
  price: number;
  bonus?: number;
  popular?: boolean;
}

const coinPackages: CoinPackage[] = [
  { coins: 100, price: 200 },
  { coins: 250, price: 450, bonus: 25 },
  { coins: 500, price: 800, bonus: 100, popular: true },
  { coins: 1000, price: 1500, bonus: 250 },
  { coins: 2500, price: 3500, bonus: 750 },
];

export function CoinPurchase({ onClose, onPurchase }: CoinPurchaseProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2>Acheter des Pièces</h2>
          <button onClick={onClose} className="text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8" />
            <div>
              <p>Débloquez des chapitres premium</p>
              <p className="text-sm text-white/90">5 pièces par chapitre</p>
            </div>
          </div>
        </div>

        {/* Coin Packages */}
        <div className="px-6 py-6 space-y-3">
          {coinPackages.map((pkg, index) => (
            <div
              key={index}
              onClick={() => onPurchase(pkg.coins + (pkg.bonus || 0), pkg.price)}
              className={`relative bg-white rounded-2xl p-5 border-2 cursor-pointer hover:shadow-lg transition-all ${
                pkg.popular ? 'border-purple-500 shadow-md' : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  ⭐ Plus populaire
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900">
                      {pkg.coins} Pièces
                      {pkg.bonus && (
                        <span className="ml-2 text-green-600">
                          + {pkg.bonus} Bonus
                        </span>
                      )}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {Math.floor((pkg.coins + (pkg.bonus || 0)) / 5)} chapitres premium
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">{pkg.price} F CFA</p>
                  {pkg.bonus && (
                    <p className="text-xs text-green-600">
                      Économisez {Math.floor((pkg.bonus / pkg.coins) * 100)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="px-6 py-6 border-t">
          <h3 className="mb-4">Moyens de paiement</h3>
          <div className="space-y-3">
            <PaymentMethod name="Orange Money" />
            <PaymentMethod name="MTN Mobile Money" />
            <PaymentMethod name="Moov Money" />
            <PaymentMethod name="Carte Bancaire" />
          </div>
        </div>

        {/* Info Text */}
        <div className="px-6 pb-6 text-center text-sm text-gray-500">
          <p>Paiement sécurisé • Pièces créditées instantanément</p>
        </div>
      </div>
    </div>
  );
}

function PaymentMethod({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="w-10 h-10 bg-white rounded-lg border flex items-center justify-center">
        <Check className="w-5 h-5 text-gray-400" />
      </div>
      <span>{name}</span>
    </div>
  );
}
