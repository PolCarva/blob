'use client';

import { Fluid } from '@whatisjery/react-fluid-distortion';
import { EffectComposer } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          background: '#000000',
          zIndex: 0,
        }}>
        <EffectComposer>
          <Fluid curl={0.1} />
        </EffectComposer>
      </Canvas>
    </main>
  );
}