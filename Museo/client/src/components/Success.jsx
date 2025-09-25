import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-gray-700 text-center max-w-lg w-full hover-lift">
        <div className="flex justify-center text-purple-400 mb-6">
          <CheckCircle className="w-16 h-16" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-100 mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-gray-300 text-lg mb-8">
          Your monument tour has been successfully booked. Check your email for the confirmation details.
        </p>
        
        <div className="space-y-4">
          <button
            className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            onClick={() => navigate('/browse')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Browse</span>
          </button>
          
          <p className="text-gray-400 text-sm">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;