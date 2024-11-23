'use client'

import { useState } from 'react'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { Scan } from 'lucide-react'
import StoryDetails from './StoryDetails'

// Mock data for search results
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
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedStory, setSelectedStory] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const filteredResults = mockData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(filteredResults)
    setSelectedStory(null)
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for a book or movie"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              aria-label="Scan"
            >
              <Scan className="h-4 w-4" />
            </button>
          </div>
          <button type="submit">Search</button>
        </div>
      </form>

      {searchResults.length > 0 && !selectedStory && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <ul className="space-y-2">
            {searchResults.map((item) => (
              <li key={item.id} className="border p-2 rounded cursor-pointer hover:bg-gray-100" onClick={() => setSelectedStory(item)}>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.type}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedStory && <StoryDetails story={selectedStory} />}
    </div>
  )
}

