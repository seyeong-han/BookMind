'use client'

export default function CharacterList({ characters }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Characters</h3>
      <ul className="space-y-2">
        {characters.map((character) => (
          <li key={character.id} className="border p-2 rounded">
            <h4 className="font-medium">{character.name}</h4>
            <p className="text-sm text-gray-600">{character.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

