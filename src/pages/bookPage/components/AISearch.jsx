import { useState } from "react";

export default function AISearch() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSearch = async () => {
    try {
      // Simulate AI response
      const aiResponse = `AI response for: "${query}"`;
      setResponse(aiResponse);
      // Here you would typically call your backend API to get the AI response
      // and update the graph data
    } catch (error) {
      console.error("Error in AI search:", error);
      setResponse("An error occurred while processing your request.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">AI-Powered Search</h2>
      <input
        type="text"
        placeholder="Ask about character relationships"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Search
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-gray-800 mb-2">AI Response:</h3>
          <p className="text-gray-600">{response}</p>
        </div>
      )}
    </div>
  );
}
