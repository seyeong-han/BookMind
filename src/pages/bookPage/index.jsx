import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBook, FaSpinner } from "react-icons/fa";
import AISearch from "./components/AISearch";
import CharacterGraph from "./components/CharacterGraph";
import axios from "axios";

export default function BookPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [graphData, setGraphData] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [searchComplete, setSearchComplete] = useState(false);

  const navigate = useNavigate();

  const verificationGraphData = (graphData) => {
    try {
      // Create Set of valid node IDs
      const nodeIds = new Set(graphData.nodes.map((node) => node.id));

      // Filter links to only include valid node references
      const validLinks = graphData.links.filter(
        (link) => nodeIds.has(link.source) && nodeIds.has(link.target)
      );

      console.log("validLinks:", validLinks);

      return {
        nodes: graphData.nodes,
        links: validLinks,
      };
    } catch (error) {
      console.error("Error validating graph data:", error);
      return graphData; // Return original data if validation fails
    }
  };

  const initializeMemory = async (title) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/initialize", {
        title: title,
      });
      console.log("Memory initialized:", response.data);

      // Verify and set graph data
      const verifiedData = verificationGraphData(response.data);
      setGraphData(verifiedData);

      setMessage("Memory initialized successfully!");
      return verifiedData;
    } catch (error) {
      console.error("Initialization error:", error);
      setMessage("Error initializing memory.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const queryMemory = async (query) => {
    try {
      const response = await axios.post("http://localhost:5001/query", {
        query: query,
      });
      return response.data;
    } catch (error) {
      console.error("Query error:", error);
      setMessage("Error querying memory.");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setMessage("Please enter a book or movie title");
      return;
    }

    setIsLoading(true);
    try {
      const response = await initializeMemory(searchTerm);
      setBookData({
        title: searchTerm,
        subtitle: "Explore character relationships",
        posterUrl: "/placeholder.svg?height=300&width=200",
      });
      setSearchComplete(true);
    } catch (error) {
      setError(error.message);
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="max-w-md mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Character Mind Map
            </span>
          </h1>
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8 space-y-6 transform transition-all duration-300 hover:scale-[1.02]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter book or movie title..."
                  className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         transition-all duration-200 bg-white/90
                         placeholder-gray-400 text-gray-700"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white font-semibold py-3 px-6 rounded-lg
                       transform transition-all duration-200
                       hover:from-blue-600 hover:to-indigo-700
                       focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center space-x-2"
              >
                <FaSearch className={`${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "Searching..." : "Search"}</span>
              </button>
            </form>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Search for any book or movie to explore character relationships
          </p>
        </div>

        {/* Info Section - Only show when search is complete */}
        {searchComplete && bookData && (
          <div className="space-y-8">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    src={bookData.posterUrl}
                    alt={bookData.title}
                    className="h-48 w-full object-cover md:h-full md:w-48"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center">
                    <FaBook className="text-blue-500 mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">
                      {bookData.title}
                    </h1>
                  </div>
                  <p className="mt-2 text-gray-600">{bookData.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6">
                <AISearch bookTitle={bookData.title} />
              </div>
              <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6">
                <CharacterGraph graphData={graphData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
