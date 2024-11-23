import SearchPage from './components/SearchPage'

export default function BookPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Character Relationship Visualizer</h1>
      <p className="mb-6 text-gray-600">Search for a book or movie to see character relationships</p>
      <SearchPage />
    </main>
  )
}

