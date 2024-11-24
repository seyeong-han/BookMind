import dynamic from 'next/dynamic'
import Image from 'next/image'

const CharacterGraph = dynamic(() => import('@/components/CharacterGraph'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center">Loading Character Graph...</div>
})

const AISearch = dynamic(() => import('@/components/AISearch'), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Loading AI Search...</div>
})

export default function InfoPage() {
  const bookInfo = {
    title: "Harry Potter and the Philosopher's Stone",
    subtitle: "The boy who lived comes to Hogwarts",
    posterUrl: "/placeholder.svg?height=300&width=200"
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={bookInfo.posterUrl}
              alt={bookInfo.title}
              width={200}
              height={300}
              className="h-full w-full object-cover md:w-48"
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{bookInfo.title}</h1>
            <p className="text-gray-600">{bookInfo.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <AISearch />
        <CharacterGraph />
      </div>
    </div>
  )
}

