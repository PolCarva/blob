'use client';

import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10 w-screen h-screen bg-black">
        <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          zIndex: 0,
          background: '#010101',
        }}>
        <EffectComposer>
          <Fluid fluidColor="#fafafa" backgroundColor="#010101" curl={0.1} />
        </EffectComposer>
      </Canvas>
      </div>
    </main>
  );
}