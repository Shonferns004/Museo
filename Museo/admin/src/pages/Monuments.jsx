import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const MonumentsList = () => {
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/monument/get");
        setMonuments(response.data); // Ensure API returns { monuments: [...] }
      } catch (error) {
        toast.error("Failed to load monuments");
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  // Function to delete a monument
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this monument?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/monument/${id}`);
      setMonuments(monuments.filter((monument) => monument._id !== id));
      toast.success("Monument deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete monument.");
    }
  };

  return (
    <div className=" text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#BB86FC] text-center mb-8">
          Monuments List
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-[#BB86FC]/70">Loading monuments...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monuments.length > 0 ? (
              monuments.map((monument) => {
                const {
                  _id,
                  name,
                  location,
                  description,
                  imageUrl,
                  amount,
                  discount,
                  ticketsAvailable,
                } = monument;

                return (
                  <div
                    key={_id}
                    className="bg-[#1E1E1E] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
                  >
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => handleDelete(_id)}
                        className="absolute top-3 right-3 bg-[#1E1E1E]/80 hover:bg-[#BB86FC] text-white p-2 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#BB86FC] mb-2">
                        {name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{location}</p>
                      <p className="text-gray-500 text-sm mb-4">
                        {description.slice(0, 100)}
                        {description.length > 100 && "..."}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          {discount > 0 && discount < amount ? (
                            <div className="space-x-2">
                              <span className="text-gray-500 line-through">
                                ₹{amount}
                              </span>
                              <span className="text-[#BB86FC] font-bold">
                                ₹{discount}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[#BB86FC] font-bold">
                              ₹{amount}
                            </span>
                          )}
                        </div>

                        <div>
                          {ticketsAvailable < 15 ? (
                            <p className="text-[#CF6679] text-sm font-medium">
                              Only {ticketsAvailable} tickets left!
                            </p>
                          ) : (
                            <p className="text-gray-400 text-sm">
                              {ticketsAvailable} available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No monuments found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonumentsList;