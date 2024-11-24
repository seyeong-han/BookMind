import { useState } from 'react'
import { Scan } from 'lucide-react'
import StoryDetails from './StoryDetails'

const mockData = [
  { 
    id: 1, 
    title: "Harry Potter and the Philosopher's Stone",
    subtitle: "The boy who lived comes to Hogwarts",
    type: "Book",
    coverImage: "/placeholder.svg?height=600&width=400",
    characters: [
      { id: 1, name: "Harry Potter", description: "The boy who lived" },
      { id: 2, name: "Hermione Granger", description: "Brightest witch of her age" },
      { id: 3, name: "Ron Weasley", description: "Harry's loyal friend" },
    ],
    relationships: [
      { source: "Harry Potter", target: "Hermione Granger", relationship: "Friends" },
      { source: "Harry Potter", target: "Ron Weasley", relationship: "Best friends" },
      { source: "Hermione Granger", target: "Ron Weasley", relationship: "Friends" },
    ]
  },
  { 
    id: 2, 
    title: "The Lord of the Rings: The Fellowship of the Ring",
    subtitle: "One Ring to rule them all",
    type: "Book",
    coverImage: "/placeholder.svg?height=600&width=400",
    characters: [
      { id: 1, name: "Frodo Baggins", description: "The Ring-bearer" },
      { id: 2, name: "Samwise Gamgee", description: "Frodo's loyal gardener" },
      { id: 3, name: "Gandalf", description: "The Grey Wizard" },
    ],
    relationships: [
      { source: "Frodo Baggins", target: "Samwise Gamgee", relationship: "Master and servant, friends" },
      { source: "Frodo Baggins", target: "Gandalf", relationship: "Mentor and student" },
      { source: "Samwise Gamgee", target: "Gandalf", relationship: "Allies" },
    ]
  },
]

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
  
    const handleSearch = (e) => {
      e.preventDefault();
      const filteredResults = mockData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      setSelectedStory(null);
    };
  
    return (
      <div className="p-4 max-w-screen-lg mx-auto">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex items-center gap-2">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search for a book or movie"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg"
            />
  
            {/* Scan Icon */}
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              aria-label="Scan"
            >
              <Scan className="h-6 w-6 text-gray-600" />
            </button>
  
            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>
  
        {searchResults.length > 0 && !selectedStory && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <ul className="space-y-4">
              {searchResults.map((item) => (
                <li
                  key={item.id}
                  className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setSelectedStory(item)}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.type}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {selectedStory && <StoryDetails story={selectedStory} />}
      </div>
    );
  }