'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { 
  ssr: false,
  loading: () => <p>Loading Graph...</p>
})

export default function CharacterGraph() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 })

  const [data] = useState({
    nodes: [
      // { id: "Harry Potter", group: 1 },
      // { id: "Ron Weasley", group: 1 },
      // { id: "Hermione Granger", group: 1 },
      // { id: "Lord Voldemort", group: 2 }
    ],
    links: [
      // { source: "Harry Potter", target: "Ron Weasley", relationship: "Friends" },
      // { source: "Harry Potter", target: "Hermione Granger", relationship: "Friends" },
      // { source: "Ron Weasley", target: "Hermione Granger", relationship: "Friends" },
      // { source: "Harry Potter", target: "Lord Voldemort", relationship: "Enemy" }
    ]
  })

  useEffect(() => {
    setMounted(true)

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(300, containerRef.current.offsetHeight)
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Character Relationship Graph</h2>
      <div ref={containerRef} className="w-full h-[400px]">
        <ForceGraph2D
          graphData={data}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id
            const fontSize = 12 / globalScale
            ctx.font = `${fontSize}px Inter`
            const textWidth = ctx.measureText(label).width
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2)

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = node.group === 1 ? '#3b82f6' : '#ef4444'
            ctx.fillText(label, node.x, node.y)

            node.__bckgDimensions = bckgDimensions // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color
            const bckgDimensions = node.__bckgDimensions
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)
          }}
          linkColor={() => '#9ca3af'}
          linkWidth={1}
          backgroundColor="#ffffff"
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  )
}

