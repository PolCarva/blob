import React from 'react'
import Blob from '@/components/Blob'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Blob
        start={true}
        appear={true}
        className="fixed inset-0 z-10 w-full h-full"
        settings={{
          numParticles: 50,
          particleAuraRadius: 40,
          blobColor: '#fafafa',
          bgColor: '#010101',
          attractiveness: 0.4,
          viscosity: 0.05,
          timeScale: 1,
          randomRadiusFactor: 0.8,
          soothingFactor: 0,
          centerAttractFactor: 0.8,
          equilibriumDistance: 15,
          
        }}
      />
      <div className="fixed inset-0 z-0 grid place-items-center">
        <h1 className="text-4xl z-0 font-bold text-black">Pablo Carvalho</h1>
      </div>
    </main>
  )
} 