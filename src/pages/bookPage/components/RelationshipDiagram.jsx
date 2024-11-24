'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
//import { Card, CardContent } from "@/components/ui/card"
//import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"

export default function RelationshipDiagram({ relationships }) {
  const canvasRef = useRef(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [draggingCharacter, setDraggingCharacter] = useState(null)
  const [positions, setPositions] = useState({})
  const [memos, setMemos] = useState({})
  const [newMemo, setNewMemo] = useState('')
  const [hoveredCharacter, setHoveredCharacter] = useState(null)
  const [aiGeneratedContent, setAiGeneratedContent] = useState({}) // Added AI state

  const initializePositions = useCallback(() => {
    const characters = new Set(relationships.flatMap(r => [r.source, r.target]))
    const newPositions = {}

    const canvas = canvasRef.current
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 50
    let angle = 0
    const step = (2 * Math.PI) / characters.size

    characters.forEach(char => {
      if (!positions[char]) {
        newPositions[char] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        }
        angle += step
      }
    })

    setPositions(prev => ({ ...prev, ...newPositions }))
  }, [relationships, positions])

  const drawDiagram = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw relationships
    relationships.forEach(rel => {
      const start = positions[rel.source]
      const end = positions[rel.target]
      
      if (start && end) {
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.strokeStyle = selectedCharacter && (selectedCharacter === rel.source || selectedCharacter === rel.target) ? '#0000FF' : '#999999'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw relationship text
        const midX = (start.x + end.x) / 2
        const midY = (start.y + end.y) / 2
        ctx.fillStyle = '#666666'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(rel.relationship, midX, midY)

        // Add visualization for AI-generated relationship insights
        // Example: drawAIInsight(ctx, midX, midY, aiGeneratedContent[rel.source + rel.target])
      }
    })

    // Draw character nodes
    Object.entries(positions).forEach(([char, pos]) => {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
      
      // Glow effect only on hover
      if (hoveredCharacter === char) {
        ctx.shadowColor = '#FFA500'
        ctx.shadowBlur = 10
        ctx.fillStyle = '#5CBA7D'  // Slightly lighter green for hover effect
      } else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.fillStyle = selectedCharacter === char ? '#0000FF' : '#4CAF50'
      }
      ctx.fill()
      
      // Reset shadow for text and other elements
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0

      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 14px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(char.charAt(0), pos.x, pos.y)

      ctx.fillStyle = '#000000'
      ctx.font = '12px Arial'
      ctx.fillText(char, pos.x, pos.y + 30)

      // Draw memo indicator if exists
      if (memos[char]) {
        ctx.fillStyle = '#FF0000'
        ctx.beginPath()
        ctx.arc(pos.x + 15, pos.y - 15, 5, 0, 2 * Math.PI)
        ctx.fill()
      }

      // Add visualization for AI-generated character insights
      // Example: drawAICharacterInsight(ctx, pos.x, pos.y, aiGeneratedContent[char])
    })
  }, [relationships, positions, selectedCharacter, hoveredCharacter, memos, aiGeneratedContent])

  useEffect(() => {
    initializePositions()
  }, [initializePositions])

  useEffect(() => {
    drawDiagram()
  }, [drawDiagram])

  const getMousePos = useCallback((canvas, evt) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    }
  }, [])

  const handleCanvasMouseDown = useCallback((event) => {
    const canvas = canvasRef.current
    const { x, y } = getMousePos(canvas, event)

    for (const [char, pos] of Object.entries(positions)) {
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2)
      if (distance <= 20) {
        if (selectedCharacter === char) {
          setDraggingCharacter(char)
        } else {
          setSelectedCharacter(char)
          // Trigger AI to generate insights about the selected character
          // Example: generateAIInsights(char)
        }
        return
      }
    }

    setSelectedCharacter(null)
    setDraggingCharacter(null)
  }, [positions, selectedCharacter, getMousePos])

  const handleCanvasMouseMove = useCallback((event) => {
    const canvas = canvasRef.current
    const { x, y } = getMousePos(canvas, event)

    if (draggingCharacter) {
      setPositions(prev => ({
        ...prev,
        [draggingCharacter]: { x, y }
      }))
    }

    let hovered = null
    for (const [char, pos] of Object.entries(positions)) {
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2)
      if (distance <= 20) {
        hovered = char
        break
      }
    }
    
    if (hovered !== hoveredCharacter) {
      setHoveredCharacter(hovered)
      console.log('Hovered character:', hovered) // Debug log
    }

    // Redraw on every mouse move to ensure responsiveness
    drawDiagram()
  }, [draggingCharacter, positions, hoveredCharacter, getMousePos, drawDiagram])

  const handleCanvasMouseUp = useCallback(() => {
    setDraggingCharacter(null)
  }, [])

  const handleAddMemo = useCallback(() => {
    if (selectedCharacter && newMemo.trim()) {
      setMemos(prev => ({
        ...prev,
        [selectedCharacter]: newMemo.trim()
      }))
      setNewMemo('')

      // Trigger AI to analyze the new memo and generate insights
      // Example: analyzeAndGenerateInsights(selectedCharacter, newMemo.trim())
    }
  }, [selectedCharacter, newMemo])

  useEffect(() => {
    const canvas = canvasRef.current
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      drawDiagram()
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [drawDiagram])

  // Add a function to handle AI-generated insights
  // const handleAIInsights = (insights) => {
  //   setAiGeneratedContent(prev => ({...prev, ...insights}))
  // }

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        className="w-full h-[400px] border rounded-lg shadow-md cursor-pointer"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={() => {
          setDraggingCharacter(null)
          setHoveredCharacter(null)
        }}
        aria-label="Character Relationship Diagram"
        role="img"
      />
      {selectedCharacter && (
        <card className="mt-4">
          <cardcontent className="pt-6">
            <h4 className="text-lg font-semibold mb-2">{selectedCharacter}</h4>
            <p className="mb-2">Relationships:</p>
            <ul className="list-disc pl-5 mb-4">
              {relationships
                .filter(rel => rel.source === selectedCharacter || rel.target === selectedCharacter)
                .map((rel, index) => (
                  <li key={index}>
                    {rel.source === selectedCharacter ? rel.target : rel.source}: {rel.relationship}
                  </li>
                ))
              }
            </ul>
            <div className="mb-2">
              <p className="font-semibold">Memo:</p>
              <p>{memos[selectedCharacter] || 'No memo added yet.'}</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a memo"
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
              />
              <button onClick={handleAddMemo}>Add Memo</button>
            </div>
            {/* Add a section to display AI-generated insights */}
            <div className="mt-4">
              <h5 className="font-semibold">AI Insights:</h5>
              <p>{aiGeneratedContent[selectedCharacter] || 'No AI insights available yet.'}</p>
            </div> 
          </cardcontent>
        </card>
      )}
      <div className="mt-4 flex justify-center">
        <button onClick={() => setSelectedCharacter(null)} variant="outline">Reset Selection</button>
      </div>
    </div>
  )
}

