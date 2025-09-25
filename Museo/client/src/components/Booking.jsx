import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Search } from 'lucide-react';

const MonumentList = ({ monuments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMonuments, setFilteredMonuments] = useState(monuments);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredMonuments(monuments);
      setSuggestions([]);
      return;
    }

    const filtered = monuments.filter((monument) =>
      monument.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMonuments(filtered);
    setSuggestions(filtered.slice(0, 5));
  };

  const selectSuggestion = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
    setFilteredMonuments(monuments.filter(monument => monument.name === name));
  };

  return (
    <div className="min-h-screen bg-[#121212] px-4 py-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Explore Historical Monuments
        </h1>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-lg mx-auto mb-12">
          <div className="flex items-center bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl p-3 shadow-lg transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-purple-500/20">
            <Search className="text-purple-400 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Search monuments..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-transparent text-gray-100 outline-none placeholder-gray-500"
            />
          </div>
          {/* AutoComplete Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-[#1E1E1E] border border-[#2D2D2D] rounded-xl mt-2 z-10 shadow-xl overflow-hidden">
              {suggestions.map((monument) => (
                <li 
                  key={monument._id} 
                  className="px-4 py-3 hover:bg-purple-500/20 cursor-pointer transition-colors duration-200"
                  onClick={() => selectSuggestion(monument.name)}
                >
                  {monument.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Monument Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMonuments.length > 0 ? filteredMonuments.map((monument) => (
            <div 
              key={monument._id} 
              className="group bg-[#1E1E1E] rounded-xl border border-[#2D2D2D] overflow-hidden hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <Link to={`/monument/${monument._id}`}>
                <div className="relative">
                  <img 
                    src={monument.imageUrl} 
                    alt={monument.name} 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {monument.discount > 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1.5 rounded-full font-medium shadow-lg">
                        {monument.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-100 group-hover:text-purple-400 transition-colors duration-300">
                    {monument.name}
                  </h2>
                  <p className="text-gray-400 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                    {monument.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ₹{monument.amount - (monument.amount * monument.discount / 100)}
                        {monument.discount > 0 && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{monument.amount}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-12">
              <p className="text-gray-400 text-lg text-center mb-2">No monuments found</p>
              <p className="text-gray-500 text-center">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonumentList;