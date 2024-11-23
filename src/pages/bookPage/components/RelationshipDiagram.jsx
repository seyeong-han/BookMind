'use client'

import { useEffect, useRef } from 'react'

export default function RelationshipDiagram({ relationships }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        
        const characters = new Set(relationships.flatMap(r => [r.source, r.target]))
        const positions = {}

        // Position characters in a circle
        const centerX = canvasRef.current.width / 2
        const centerY = canvasRef.current.height / 2
        const radius = Math.min(centerX, centerY) - 50
        let angle = 0
        const step = (2 * Math.PI) / characters.size

        characters.forEach(char => {
          positions[char] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          }
          angle += step
        })

        // Draw relationships
        relationships.forEach(rel => {
          const start = positions[rel.source]
          const end = positions[rel.target]
          
          ctx.beginPath()
          ctx.moveTo(start.x, start.y)
          ctx.lineTo(end.x, end.y)
          ctx.stroke()

          // Draw relationship text
          const midX = (start.x + end.x) / 2
          const midY = (start.y + end.y) / 2
          ctx.fillText(rel.relationship, midX, midY)
        })

        // Draw character names
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        Object.entries(positions).forEach(([char, pos]) => {
          ctx.fillText(char, pos.x, pos.y)
        })
      }
    }
  }, [relationships])

  return (
    <canvas ref={canvasRef} width={300} height={300} className="w-full h-auto"></canvas>
  )
}

