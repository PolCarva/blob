'use client'

import React from 'react'
import Blob from '@/components/Blob'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Blob
        start={true}
        appear={true}
        settings={{
          numParticles: 50,
          particleAuraRadius: 30,
          blobColor: '#1a33ff',
          bgColor: '#000000',
          attractiveness: 0.4,
          viscosity: 0.05,
        }}
      />
     
    </main>
  )
} 