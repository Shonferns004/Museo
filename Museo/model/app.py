from flask import Flask, request, jsonify
from pymongo import MongoClient
import google.generativeai as genai
import folium
from geopy.geocoders import Nominatim
from flask_cors import CORS
from difflib import get_close_matches

app = Flask(__name__)
CORS(app)  # Enable CORS for Node.js requests

# Configure Gemini API
genai.configure(api_key="your-gemni-api key")
model = genai.GenerativeModel("gemini-2.0-flash")

# MongoDB Connection
client = MongoClient("you-monog-db-link")
db = client["museo"]
monuments_collection = db["monuments"]

# Geolocator for location data
geolocator = Nominatim(user_agent="monument_tour")

# 1️⃣ Recommend Monuments
@app.route("/recommend-monuments", methods=["GET"])
def recommend_monuments():
    user_query = request.args.get("user_query", "").lower()
    if not user_query:
        return jsonify({"error": "Query parameter is missing"}), 400

    # Fetch all monument names
    monuments = list(monuments_collection.find({}, {"_id": 0, "name": 1}))
    monument_names = [monument["name"] for monument in monuments]

    # Find the closest matches
    recommendations = get_close_matches(user_query, monument_names, n=3, cutoff=0.3)

    # If less than 3 matches found, fill with random unique monuments
    if len(recommendations) < 3:
        remaining_monuments = [m for m in monument_names if m not in recommendations]
        recommendations.extend(remaining_monuments[:3 - len(recommendations)])  # Add more if needed

    return jsonify({"recommended_monuments": recommendations[:4]})  

# 2️⃣ Plan Tour (AI-Generated)
@app.route("/plan-tour", methods=["GET"])
def plan_tour():
    monument_name = request.args.get("monument_name")
    duration = int(request.args.get("duration", 1))
    budget = request.args.get("budget", "medium")
    travel_mode = request.args.get("travel_mode", "car")

    monument = monuments_collection.find_one({"name": monument_name}, {"_id": 0})
    if not monument:
        return jsonify({"error": "Monument not found"})

    location = geolocator.geocode(monument_name)
    prompt = f"""
    Plan a {duration}-day tour for {monument_name}.
    Consider budget ({budget}) and travel mode ({travel_mode}).
    Include best visiting hours, nearby attractions, travel time & cost.
    Location details (Lat: {location.latitude}, Long: {location.longitude}).
    """
    
    response = model.generate_content(prompt)
    
    return jsonify({
        "itinerary": response.text,
        "location": {"latitude": location.latitude, "longitude": location.longitude}
    })

# 3️⃣ Modify Schedule
@app.route("/edit-schedule", methods=["POST"])
def edit_schedule():
    edited_schedule = request.json.get("edited_schedule", {})
    prompt = f"Modify this itinerary: {edited_schedule}. Optimize for time, budget, and travel."
    
    response = model.generate_content(prompt)
    
    return jsonify({"updated_itinerary": response.text})

# 4️⃣ Location Visualization
@app.route("/visualize-tour", methods=["GET"])
def visualize_tour():
    monument_name = request.args.get("monument_name")
    location = geolocator.geocode(monument_name)
    
    if not location:
        return jsonify({"error": "Location not found"})

    # Generate Map
    tour_map = folium.Map(location=[location.latitude, location.longitude], zoom_start=12)
    folium.Marker(
        [location.latitude, location.longitude],
        popup=f"{monument_name}",
        tooltip="Click for details",
        icon=folium.Icon(color="red", icon="info-sign"),
    ).add_to(tour_map)

    map_file = f"static/{monument_name.replace(' ', '_')}_map.html"
    tour_map.save(map_file)

    return jsonify({"map_url": map_file})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
