import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Clock, MapPin, Users, Calendar, CreditCard, Tag, Gift, ArrowLeft } from 'lucide-react';

const stripePromise = loadStripe("pk_test_51R9LFCDFFia90DSzMdiHT9wCknuL7anSLbJsFgcMFws0wdza6fOGaz7nc5H4KxQebdr6FilIzwwhsYPN2Wck7SZh00NlkgqFGh");

const MonumentDetail = ({ monuments }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monument, setMonument] = useState(null);
  const [relatedMonuments, setRelatedMonuments] = useState([]);
  const [bookingData, setBookingData] = useState({
    visitDate: '',
    visitTime: '',
    ticketType: 'General',
    numAdults: 1,
    numChildren: 0,
    numSeniors: 0,
    addOns: []
  });
  const [isBooking, setIsBooking] = useState(false);


  useEffect(() => {
    const updatePaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");
  
      if (sessionId) {
        try {
          await axios.get(`http://localhost:3000/api/payment/success?session_id=${sessionId}`);
          navigate('/success');
        } catch (error) {
          console.error("Payment update error:", error);
        }
      }
    };
  
    updatePaymentStatus();
  }, [navigate]);

  useEffect(() => {
    const foundMonument = monuments.find(m => m._id === id);
    if (foundMonument) {
      setMonument(foundMonument);
      const related = monuments.filter(m => m._id !== id).slice(0, 3);
      setRelatedMonuments(related);
    } else {
      navigate('/');
    }
  }, [id, monuments, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const newAddOns = checked 
        ? [...bookingData.addOns, value]
        : bookingData.addOns.filter(item => item !== value);
      setBookingData({ ...bookingData, addOns: newAddOns });
    } else {
      setBookingData({ ...bookingData, [name]: type === 'number' ? parseInt(value) : value });
    }
  };

  const calculateTotal = () => {
    if (!monument) return 0;
    const discount = Math.min(monument.discount, 100);
    const basePrice = monument.amount * (1 - discount / 100);
    
    const adultPrice = bookingData.numAdults * basePrice;
    const childPrice = bookingData.numChildren * (basePrice * 0.5);
    const seniorPrice = bookingData.numSeniors * (basePrice * 0.7);
    const addOnsPrice = bookingData.addOns.length * 100;
    
    return Math.max(0, adultPrice + childPrice + seniorPrice + addOnsPrice);
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.id || !user.email) {
        alert("User not logged in. Please log in first.");
        return;
      }

      const bookingPayload = {
        ...bookingData,
        totalPrice: calculateTotal(),
        paymentStatus: 'Paid',
        user: user.id,
        email: user.email
      };

      const response2 = await axios.post('http://localhost:3000/api/book', bookingPayload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response2.data.ticket) {
        console.error("Error: Ticket data is missing in response.");
        alert("Booking failed. Please try again.");
        return;
      }

      const id = response2.data.ticket._id;
      const amt = response2.data.ticket.totalPrice;

      const response = await axios.post('http://localhost:3000/api/payment/check-out', {
        bookingId: id,
        bookingAmt: amt,
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe error:", error);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred during booking.");
    } finally {
      setIsBooking(false);
    }
  };

  

  if (!monument) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-300">Loading monument details...</div>
    </div>
  );

  return (
    <div className="  px-4 py-8 text-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm md:text-base font-medium">Back to Monuments</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <img 
              src={monument.imageUrl} 
              alt={monument.name} 
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2 text-gray-100">{monument.name}</h1>
              <p className="text-gray-400 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                {monument.location}
              </p>
              
              <div className="flex items-center mb-4 bg-gray-700/50 p-4 rounded-lg">
                <Tag className="h-6 w-6 mr-3 text-purple-400" />
                <div>
                  <span className="text-2xl font-bold mr-2 text-gray-100">
                    ₹{monument.amount - (monument.amount * monument.discount / 100)}
                  </span>
                  {monument.discount > 0 && (
                    <>
                      <span className="text-lg text-gray-400 line-through mr-2">₹{monument.amount}</span>
                      <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm px-3 py-1 rounded-full">
                        {monument.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-100">Description</h2>
                <p className="text-gray-300">{monument.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-400 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Opening Time
                  </h3>
                  <p className="text-gray-300">{monument.openingTime}</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-400 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Closing Time
                  </h3>
                  <p className="text-gray-300">{monument.closingTime}</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg col-span-2">
                  <h3 className="font-semibold text-purple-400 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Tickets Available
                  </h3>
                  <p className="text-gray-300">{monument.ticketsAvailable}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Book Your Visit</h2>
            
            <form onSubmit={handleBookNow} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  Visit Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={bookingData.visitDate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-400" />
                  Visit Time
                </label>
                <select
                  name="visitTime"
                  value={bookingData.visitTime}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
                  required
                >
                  <option value="">Select a time slot</option>
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-purple-400" />
                  Ticket Type
                </label>
                <select
                  name="ticketType"
                  value={bookingData.ticketType}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
                >
                  <option value="General">General Admission</option>
                  <option value="Guided Tour">Guided Tour</option>
                  <option value="Special Exhibition">Special Exhibition</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-400" />
                  Number of Adults
                </label>
                <input
                  type="number"
                  name="numAdults"
                  min="1"
                  value={bookingData.numAdults}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Number of Children (under 12)</label>
                <input
                  type="number"
                  name="numChildren"
                  min="0"
                  value={bookingData.numChildren}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Number of Seniors (65+)</label>
                <input
                  type="number"
                  name="numSeniors"
                  min="0"
                  value={bookingData.numSeniors}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:border-purple-500 focus:ring focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 flex items-center">
                  <Gift className="h-4 w-4 mr-2 text-purple-400" />
                  Add-ons (₹100 each)
                </label>
                <div className="space-y-2 bg-gray-700/50 p-4 rounded-lg">
                  <label className="flex items-center text-gray-200">
                    <input
                      type="checkbox"
                      name="addOns"
                      value="Audio Guide"
                      checked={bookingData.addOns.includes('Audio Guide')}
                      onChange={handleInputChange}
                      className="mr-2 text-purple-500 rounded focus:ring-purple-500"
                    />
                    Audio Guide
                  </label>
                  <label className="flex items-center text-gray-200">
                    <input
                      type="checkbox"
                      name="addOns"
                      value="VR Experience"
                      checked={bookingData.addOns.includes('VR Experience')}
                      onChange={handleInputChange}
                      className="mr-2 text-purple-500 rounded focus:ring-purple-500"
                    />
                    VR Experience
                  </label>
                  <label className="flex items-center text-gray-200">
                    <input
                      type="checkbox"
                      name="addOns"
                      value="Souvenir"
                      checked={bookingData.addOns.includes('Souvenir')}
                      onChange={handleInputChange}
                      className="mr-2 text-purple-500 rounded focus:ring-purple-500"
                    />
                    Souvenir Package
                  </label>
                </div>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-200 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-purple-400" />
                  Price Summary
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Adults ({bookingData.numAdults} x ₹{monument.amount - (monument.amount * monument.discount / 100)})</span>
                    <span>₹{bookingData.numAdults * (monument.amount - (monument.amount * monument.discount / 100))}</span>
                  </div>
                  {bookingData.numChildren > 0 && (
                    <div className="flex justify-between">
                      <span>Children ({bookingData.numChildren} x ₹{(monument.amount - (monument.amount * monument.discount / 100)) * 0.5})</span>
                      <span>₹{bookingData.numChildren * (monument.amount - (monument.amount * monument.discount / 100)) * 0.5}</span>
                    </div>
                  )}
                  {bookingData.numSeniors > 0 && (
                    <div className="flex justify-between">
                      <span>Seniors ({bookingData.numSeniors} x ₹{(monument.amount - (monument.amount * monument.discount / 100)) * 0.7})</span>
                      <span>₹{bookingData.numSeniors * (monument.amount - (monument.amount * monument.discount / 100)) * 0.7}</span>
                    </div>
                  )}
                  {bookingData.addOns.length > 0 && (
                    <div className="flex justify-between">
                      <span>Add-ons ({bookingData.addOns.length} x ₹100)</span>
                      <span>₹{bookingData.addOns.length * 100}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-600">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBooking}
                className={`
                  w-full py-3 px-4 rounded-lg
                  bg-gradient-to-r from-purple-500 to-pink-600
                  text-white font-medium
                  flex items-center justify-center
                  transition-all duration-200
                  ${isBooking ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                `}
              >
                {isBooking ? (
                  <>
                    <Clock className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  'Book Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {relatedMonuments.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Related Monuments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedMonuments.map((mon) => (
              <div key={mon._id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-300">
                <a href={`/monument/${mon._id}`} className="block">
                  <img 
                    src={mon.imageUrl} 
                    alt={mon.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 text-gray-100">{mon.name}</h3>
                    <p className="text-gray-400 text-sm mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-purple-400" />
                      {mon.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-100">
                        ₹{mon.amount - (mon.amount * mon.discount / 100)}
                        {mon.discount > 0 && (
                          <span className="ml-1 text-xs text-gray-400 line-through">₹{mon.amount}</span>
                        )}
                      </span>
                      {mon.discount > 0 && (
                        <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full">
                          {mon.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonumentDetail;