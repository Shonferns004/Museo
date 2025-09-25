import React, { useEffect } from 'react';
import { Compass, Calendar, Map, Camera, Star, Users, Clock, MapPin, CreditCard, Tag, History, Building, Shield, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <header 
        className="relative py-32 text-white scroll-animate parallax"
        style={{
          backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.85)), url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400")'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-bold text-center mb-6 tracking-tight">
            AI-Powered Monument Tour Planner
          </h1>
          <p className="text-center text-2xl font-light mx-auto leading-relaxed max-w-3xl">
            Discover and plan your perfect monument tour with the power of artificial intelligence.
          </p>
          <div className="mt-12 text-center">
            <Link to="/plan">
            <button className="bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors hover-lift">
              Start Planning
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center stagger-children">
            <StatCard icon={<Building className="w-8 h-8" />} number="1M+" text="Monuments" />
            <StatCard icon={<Users className="w-8 h-8" />} number="50K+" text="Happy Travelers" />
            <StatCard icon={<History className="w-8 h-8" />} number="100+" text="Countries" />
            <StatCard icon={<Star className="w-8 h-8" />} number="4.8" text="User Rating" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            <ServiceCard
              icon={<Compass className="w-8 h-8" />}
              title="Smart Navigation"
              description="AI-powered route optimization for the perfect monument tour sequence."
            />
            <ServiceCard
              icon={<Calendar className="w-8 h-8" />}
              title="Intelligent Scheduling"
              description="Get personalized visit timings based on crowd patterns and weather."
            />
            <ServiceCard
              icon={<Map className="w-8 h-8" />}
              title="Interactive Maps"
              description="Detailed 3D maps with augmented reality monument previews."
            />
            <ServiceCard
              icon={<Camera className="w-8 h-8" />}
              title="Photo Spots"
              description="AI-recommended photography locations for the best shots."
            />
            <ServiceCard
              icon={<Star className="w-8 h-8" />}
              title="Personalized Tours"
              description="Custom itineraries based on your interests and preferences."
            />
            <ServiceCard
              icon={<Users className="w-8 h-8" />}
              title="Group Planning"
              description="Collaborative tools for planning tours with friends and family."
            />
          </div>
        </div>  
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                text: "The AI recommendations were spot-on! Made our Rome trip unforgettable.",
                author: "Sarah J.",
                location: "United States"
              },
              {
                text: "Perfect for history enthusiasts. The interactive maps are incredible.",
                author: "Michael L.",
                location: "Germany"
              },
              {
                text: "Saved us hours of planning. Best travel companion ever!",
                author: "Akiko T.",
                location: "Japan"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-700 hover-lift">
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <div className="text-purple-400 font-semibold">{testimonial.author}</div>
                <div className="text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Policy Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-6">Booking Policy</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Our booking system ensures a hassle-free experience while maintaining 
              the highest standards of service and security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 stagger-children">
            <PolicyCard
              icon={<Shield className="w-8 h-8 text-purple-400" />}
              title="Secure Booking"
              description="End-to-end encrypted payment processing and booking confirmation."
            />
            <PolicyCard
              icon={<Clock className="w-8 h-8 text-purple-400" />}
              title="Flexible Timing"
              description="Multiple time slots available with easy rescheduling options."
            />
            <PolicyCard
              icon={<CreditCard className="w-8 h-8 text-purple-400" />}
              title="Easy Payments"
              description="Support for all major payment methods with instant confirmation."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-24 px-4 relative text-white scroll-animate parallax"
        style={{
          backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.95)), url("https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=2400")'
        }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-12 font-light max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the perfect way to explore monuments worldwide.
          </p>
          <button className="bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors hover-lift inline-flex items-center gap-3">
            <Ticket className="w-6 h-6" />
            <span>Get Started Now</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, number, text }) {
  return (
    <div className="p-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow hover-lift border border-gray-700">
      <div className="flex justify-center text-purple-400 mb-4">{icon}</div>
      <div className="text-3xl font-bold text-gray-100 mb-2">{number}</div>
      <div className="text-gray-300">{text}</div>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-105 border border-gray-700">
      <div className="text-purple-400 mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-gray-100">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function PolicyCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-105 border border-gray-700">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-gray-100">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default App;