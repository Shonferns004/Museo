import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, Users, IndianRupee, AlertCircle, Ticket } from 'lucide-react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/get?userId=${userId}`);
        console.log("Fetched Reports:", response.data);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to load booking history.");
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] px-4 py-8 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Ticket className="w-8 h-8" />
          Booking History
        </h1>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-[#1E1E1E] border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid gap-8">
          {bookings.length === 0 && !loading ? (
            <div className="text-center py-12 bg-[#1E1E1E] rounded-xl border border-[#2D2D2D]">
              <p className="text-gray-400 text-lg">No bookings found.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-[#1E1E1E] rounded-xl border border-[#2D2D2D] overflow-hidden hover:border-purple-500/50 transition-all duration-300 group"
              >
                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-[#2D2D2D]">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {booking.ticketType}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(booking.paymentStatus)}`}></span>
                    <span className="text-sm text-gray-400">{booking.paymentStatus}</span>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-6 space-y-4">
                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Visit Date</p>
                        <p className="text-lg">{new Date(booking.visitDate).toDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Visit Time</p>
                        <p className="text-lg">{booking.visitTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visitors */}
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-400" />
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Adults</p>
                        <p className="text-lg">{booking.numAdults}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Children</p>
                        <p className="text-lg">{booking.numChildren}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Seniors</p>
                        <p className="text-lg">{booking.numSeniors}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Footer */}
                <div className="border-t border-[#2D2D2D] p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-purple-400" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {booking.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-[#121212] rounded-full transform -translate-y-1/2"></div>
                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-[#121212] rounded-full transform -translate-y-1/2"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;