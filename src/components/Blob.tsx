'use client'

import { useEffect, useRef } from 'react'
import { createBubble } from '@/core/bubble'
import type { BubbleSettings } from '@/core/bubble'

interface BlobProps {
  start?: boolean
  appear?: boolean
  settings: Partial<BubbleSettings>
  className?: string
}

export default function Blob({ start = true, appear = true, settings, className }: BlobProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<ReturnType<typeof createBubble> | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const defaultSettings: BubbleSettings = {
      name: 'blob',
      timeScale: 1,
      numParticles: 50,
      particleRadius: 0.001,
      particleAuraRadius: 20,
      randomRadiusFactor: 0.8,
      soothingFactor: 0.8,
      auraTypeMix: 0.005,
      threshold: 1 / 50,
      mouseRadius: 0.001,
      mouseEasingFactor: 1,
      repelExponent: 8,
      centerAttractExponent: 12,
      centerAttractFactor: 1,
      longRangeCenterAttract: 5,
      equilibriumDistance: 15,
      attractiveness: 0.4,
      longRangeTail: 3,
      viscosity: 0.05,
      startRadius: 30,
      center: {
        xRatio: 0.5,
        yRatio: 0.5,
      },
      hasBoundaries: false,
      showIsolated: false,
      isolatedLabels: [],
      projects: [],
      effectiveCheckRadius: 80,
      maxNeighbours: 1,
      startPosMode: 'circle',
      blobColor: '#001433',
      bgColor: '#1a33ff',
      maxBreath: 15,
      minBreath: -5,
      playPhysics: true,
      showGui: false,
    }

    const finalSettings = {
      ...defaultSettings,
      ...settings,
    }

    bubbleRef.current = createBubble(finalSettings, elementRef.current)
    bubbleRef.current.init()
    if (start) {
      bubbleRef.current.start({ appear })
    }

    return () => {
      bubbleRef.current?.kill()
    }
  }, [start, appear, settings])

  return (
    <div 
      ref={elementRef} 
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  )
} 