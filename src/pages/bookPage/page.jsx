import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Search for a Book or Movie</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <form className="space-y-4">
          <Input 
            type="text" 
            placeholder="Enter book or movie title" 
            className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <Link href="/info" passHref>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
              Search
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

