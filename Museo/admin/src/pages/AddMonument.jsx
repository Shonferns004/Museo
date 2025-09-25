import { Upload, MapPin, Info, Ticket, Coins, Percent, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

function App() {
  const [monument, setMonument] = useState({
    name: "",
    location: "",
    description: "",
    discount: "",
    amount: "",
    openingTime: "09:00",
    closingTime: "17:00",
    ticketsAvailable: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const handleChange = (e) => {
    setMonument({ ...monument, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMonument({ ...monument, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(monument).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post("http://localhost:3000/api/monument/add", formData);

      toast.success("Monument Added Successfully!");
      if (response.data.success) {
        setMonument({
          name: "",
          location: "",
          description: "",
          discount: "",
          amount: "",
          openingTime: "09:00",
          closingTime: "17:00",
          ticketsAvailable: "",
          image: null,
        });
        setPreview(null);
      }
    } catch (error) {
      toast.error("Error adding monument");
    }
  };

  return (
    <div className=" text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Form Header and Preview */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-[#1E1E1E] rounded-xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#BB86FC]">
                Add New Monument
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mt-4">
                Preserve history by adding details of historical monuments to our database.
              </p>
            </div>
            
            {/* Image Upload Section */}
            <div className="bg-[#1E1E1E] rounded-xl p-6 sm:p-8 shadow-lg">
              <div className="border-2 border-dashed border-[#BB86FC]/30 rounded-xl p-4 sm:p-6 text-center hover:border-[#BB86FC] transition-colors duration-200 group">
                <label className="cursor-pointer flex flex-col items-center space-y-3 sm:space-y-4">
                  <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-[#BB86FC]/70 group-hover:text-[#BB86FC] transition-colors duration-200" />
                  <span className="text-base sm:text-lg text-[#BB86FC]/90 group-hover:text-[#BB86FC] transition-colors duration-200">Upload Monument Image</span>
                  <span className="text-xs sm:text-sm text-gray-500">Click to browse</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              {preview && (
                <div className="mt-4 sm:mt-6">
                  <img src={preview} alt="Preview" className="w-full h-48 sm:h-64 object-cover rounded-xl" />
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-2/3">
            <div className="bg-[#1E1E1E] rounded-xl p-6 sm:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Monument Name"
                        value={monument.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 placeholder-gray-500 group-hover:bg-[#333333]"
                        required
                      />
                      <Info className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={monument.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 placeholder-gray-500 group-hover:bg-[#333333]"
                        required
                      />
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                    </div>

                    <div className="relative group">
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={monument.description}
                        onChange={handleChange}
                        className="w-full pl-4 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 placeholder-gray-500 h-32 group-hover:bg-[#333333]"
                        required
                      />
                    </div>
                  </div>

                  {/* Pricing and Timing */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <input
                          type="number"
                          name="amount"
                          placeholder="Amount"
                          value={monument.amount}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 placeholder-gray-500 group-hover:bg-[#333333]"
                        />
                        <Coins className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                      </div>

                      <div className="relative group">
                        <input
                          type="number"
                          name="discount"
                          placeholder="Discount (%)"
                          value={monument.discount}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 placeholder-gray-500 group-hover:bg-[#333333]"
                        />
                        <Percent className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-4">
                      <div className="relative group">
                        <label className="block text-sm text-[#BB86FC]/70 mb-2">Opening Time</label>
                        <div className="relative">
                          <select
                            name="openingTime"
                            value={monument.openingTime}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 appearance-none cursor-pointer group-hover:bg-[#333333]"
                          >
                            {timeOptions.map((time) => (
                              <option key={`open-${time}`} value={time}>{time}</option>
                            ))}
                          </select>
                          <Clock className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                          <div className="absolute right-3 top-3.5 pointer-events-none">
                            <svg className="h-5 w-5 text-[#BB86FC]/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm text-[#BB86FC]/70 mb-2">Closing Time</label>
                        <div className="relative">
                          <select
                            name="closingTime"
                            value={monument.closingTime}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 appearance-none cursor-pointer group-hover:bg-[#333333]"
                          >
                            {timeOptions.map((time) => (
                              <option key={`close-${time}`} value={time}>{time}</option>
                            ))}
                          </select>
                          <Clock className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                          <div className="absolute right-3 top-3.5 pointer-events-none">
                            <svg className="h-5 w-5 text-[#BB86FC]/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <input
                        type="number"
                        name="ticketsAvailable"
                        placeholder="Tickets Available"
                        value={monument.ticketsAvailable}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#2C2C2C] border-0 rounded-lg focus:ring-2 focus:ring-[#BB86FC] focus:border-transparent transition text-gray-100 placeholder-gray-500 group-hover:bg-[#333333]"
                        required
                      />
                      <Ticket className="absolute left-3 top-3.5 h-5 w-5 text-[#BB86FC]/70" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#BB86FC] text-gray-900 py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#BB86FC]/90 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-offset-2 focus:ring-offset-[#1E1E1E] transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
                  >
                    Add Monument
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;