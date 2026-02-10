import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, AlertCircle, CreditCard } from 'lucide-react';

const Failed = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start slide-in animation after component mounts
    setTimeout(() => setIsAnimating(true), 100);
  }, []);

  const handleGoToMonetization = () => {
    // Start slide-out animation
    setIsAnimating(false);
    setTimeout(() => {
      navigate('/monetization');
      setIsVisible(false);
    }, 300);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-0">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal sliding from bottom */}
      <div 
        className={`relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 ${
          isAnimating 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 sm:translate-y-8'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon with bounce animation */}
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full animate-bounce">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Payment Failed
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            We couldn't process your payment. Don't worry, no money was deducted.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoToMonetization}
            className="w-full bg-black text-white font-medium py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg"
          >
            <CreditCard className="h-5 w-5" />
            Go to Monetization Page
          </button>

          {/* Additional Info */}
          <p className="text-gray-500 text-center text-sm mt-4">
            Try a different payment method
          </p>
        </div>

        {/* Bottom safe area for mobile */}
        <div className="h-4 sm:h-0" />
      </div>
    </div>
  );
};

export default Failed;