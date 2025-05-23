import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const shimmerArray = new Array(8).fill(0);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/search/${activeTab}/${searchTerm}`,
        { withCredentials: true }
      );
      setResults(res.data.content);
    } catch (error) {
      toast.error("Error searching for content");
      console.error("Error searching for content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Tab Buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`py-2 px-5 rounded-full transition-all duration-300 ${
              activeTab === "movie"
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-5 rounded-full transition-all duration-300 ${
              activeTab === "tv"
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
        </div>

        {/* Search Input */}
        <form
          className="flex gap-3 items-center justify-center mb-10 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className="flex-1 px-4 py-2 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-all duration-300"
          >
            Search
          </button>
        </form>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-4 max-w-7xl mx-auto">
          {loading
            ? shimmerArray.map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 animate-pulse rounded-lg overflow-hidden shadow-md"
                >
                  <div className="w-full h-64 bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            : results.map((item) => (
                <Link to={`/watch/${item.id}`} key={item.id} onClick={() => {
                  setActiveTab(activeTab);
                }}>
                  <div className="bg-gray-900 hover:bg-gray-800 p-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
                    <img
                      src={item.primaryImage}
                      alt={item.primaryTitle}
                      className="w-full h-64 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold text-white hover:text-red-500 transition-colors duration-300 truncate">
                      {item.primaryTitle}
                    </h3>
                    <p className="mt-2 text-sm text-gray-300">{item?.description}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
