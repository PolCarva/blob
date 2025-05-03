'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { simulationVertexShader, renderFragmentShader } from '@/shaders/vertex'

const WaterMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0, 0),
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    textureA: null,
    textureB: null,
  },
  simulationVertexShader,
  renderFragmentShader
)
extend({ WaterMaterial })

function WaterPlane() {
  const material = useRef()
  const { size } = useThree()

  useEffect(() => {
    material.current.uniforms.resolution.value.set(size.width, size.height)
    const handleMouse = (e: MouseEvent) => {
      material.current.uniforms.mouse.value.set(e.clientX, size.height - e.clientY)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [size])

  useFrame((state) => {
    material.current.uniforms.time.value = state.clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <waterMaterial ref={material} transparent />
    </mesh>
  )
}

export function CanvasWaterDistortion() {
  return (
    <Canvas
      className="fixed inset-0 pointer-events-none z-10"
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 1], fov: 75 }}
    >
      <WaterPlane />
    </Canvas>
  )
}
