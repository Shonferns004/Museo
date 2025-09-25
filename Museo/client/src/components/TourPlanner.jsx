import React, { useState } from "react";
import axios from "axios";
import { Search, MapPin, Clock, Calendar, Navigation, DollarSign, Car } from "lucide-react";

function TourPlanner() {
    const [query, setQuery] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [selectedMonument, setSelectedMonument] = useState(null);
    const [itinerary, setItinerary] = useState("");
    const [loading, setLoading] = useState(false);

    const cleanRecommendations = (data) => {
        return data
            ?.split("\n")
            .map((item) =>
                item
                    .replace(/^\d+\.\s*\*\*(.*?)\*\*:?\s*/, "$1")
                    .replace(/[:***]/g, "")
                    .trim()
            )
            .filter((item) => item.length > 0);
    };

    const getRecommendations = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/api/flask/recommend?user_query=${query}`
            );
            setRecommendations(response.data?.recommended_monuments || "");
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    const planTour = async (monument) => {
        if (!monument) return;
        setSelectedMonument(monument);
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/api/flask/plan?monument_name=${monument}&duration=1&budget=medium&travel_mode=car`
            );
            const cleanedData = cleanRecommendations(response.data?.itinerary || "No itinerary available.");
            // Skip the first 8 items if they exist
            setItinerary(Array.isArray(cleanedData) ? cleanedData.slice(8) : cleanedData);
        } catch (error) {
            console.error("Error fetching tour plan:", error);
            setItinerary("Failed to load itinerary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 text-gray-100">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Discover Your Perfect Monument Tour
                </h2>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-800 border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your interests (e.g., historical, cultural)"
                    />
                    <button
                        onClick={getRecommendations}
                        disabled={loading}
                        className="mt-4 w-full md:w-auto md:absolute md:right-2 md:top-1 md:mt-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                    >
                        {loading ? "Searching..." : "Find Monuments"}
                    </button>
                </div>

                {recommendations.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                            Recommended Monuments
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendations.map((monument, index) => (
                                <div
                                    key={index}
                                    onClick={() => planTour(monument)}
                                    className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-all duration-200 border border-gray-700 hover:border-purple-500"
                                >
                                    <h4 className="font-medium text-gray-100">{monument}</h4>
                                    <p className="text-sm text-gray-400 mt-2">Click to view tour plan</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedMonument && (
                    <div className="mt-8">
                        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                    <Calendar className="h-6 w-6 mr-3 text-purple-400" />
                                    Tour Plan: {selectedMonument}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center text-gray-300">
                                        <Clock className="h-4 w-4 mr-2 text-purple-400" />
                                        Duration: 1 Day
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                                        Budget: Medium
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <Car className="h-4 w-4 mr-2 text-purple-400" />
                                        Travel Mode: Car
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Clock className="h-8 w-8 animate-spin text-purple-500" />
                                        <span className="ml-3 text-gray-400">Planning your tour...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {Array.isArray(itinerary) ? (
                                            itinerary.map((item, index) => (
                                                <div 
                                                    key={index} 
                                                    className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-purple-500/50 transition-colors duration-200"
                                                >
                                                    <div className="flex items-start">
                                                        <Navigation className="h-5 w-5 mr-3 text-purple-400 mt-1 flex-shrink-0" />
                                                        <p className="text-gray-100">{item}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                                <p className="text-gray-300">{itinerary}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TourPlanner;