'use client'

import { useState, useEffect } from 'react'
import RelationshipDiagram from './RelationshipDiagram'
import CharacterList from './CharacterList'

export default function StoryDetails({ story }) {
  const [showCover, setShowCover] = useState(true)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCover(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleQuestionSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the question to your LLaMA backend
    // For now, we'll just set a mock answer
    setAnswer(`This is a mock answer to your question: "${question}"`)
    setQuestion('')
  }

  return (
    <div className="relative">
      {showCover && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img
            src={story.coverImage}
            alt={`Cover for ${story.title}`}
            width={400}
            height={600}
            className="max-w-full max-h-full object-contain animate-fade-in"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <img
            src={story.coverImage}
            alt={`Cover for ${story.title}`}
            width={200}
            height={300}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="col-span-2">
          <h2 className="text-3xl font-bold mb-2">{story.title}</h2>
          <h3 className="text-xl text-gray-600 mb-4">{story.subtitle}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="border rounded-lg shadow-lg p-4">
          <div className="border-b pb-2 mb-4">
            <h4 className="text-xl font-bold">Characters</h4>
          </div>
          <div>
            <CharacterList characters={story.characters} />
          </div>
        </div>
        <div className="border rounded-lg shadow-lg p-4">
          <div className="border-b pb-2 mb-4">
            <h4 className="text-xl font-bold">Ask LLaMA</h4>
          </div>
          <div>
            <form onSubmit={handleQuestionSubmit}>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about the story"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="border rounded-lg p-2 flex-1"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Ask
                </button>
              </div>
            </form>
            {answer && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="border rounded-lg shadow-lg p-4">
          <div className="border-b pb-2 mb-4">
            <h4 className="text-xl font-bold">Character Relationships</h4>
          </div>
          <div>
            <RelationshipDiagram relationships={story.relationships} />
          </div>
        </div>
      </div>
    </div>
  )
}