'use client'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import useScreenSize from '@/hooks/useScreenSize'

const skills = [
    { text: 'innovation', mode: 'dark', position: [0, 2.5, 0], rotation: 5, scale: [1.2, 1.2, 1], zIndex: 1 },
    { text: 'passion', mode: "dark", position: [-2, 1.5, 0.5], rotation: 0, scale: [1.1, 1.1, 1], zIndex: 2 },
    { text: 'finance', mode: "light", position: [2, 1.5, 0.5], rotation: -1, scale: [1, 1, 1], zIndex: 2 },
    { text: 'leadership', mode: "light", position: [0, 1, 0.5], rotation: 3, scale: [1, 1, 1], zIndex: 1 },
    { text: 'recruiting', mode: "dark", position: [2, 0, 0.5], rotation: 3, scale: [1.1, 1.1, 1], zIndex: 2 },
    { text: 'marketing', mode: "light", position: [-2.5, 0, 0.5], rotation: -4, scale: [1.1, 1.1, 1], zIndex: 2 },
    { text: 'sales', mode: "light", position: [0, -0.5, 0], rotation: 4, scale: [1, 1, 1], zIndex: 1 },
    { text: 'project', mode: "dark", position: [-1.5, -1.5, 0.5], rotation: -4, scale: [1.2, 1.2, 1], zIndex: 2 },
    { text: 'DEI', mode: "light", position: [-2, -2.5, 0], rotation: 0, scale: [1, 1, 1], zIndex: 1 },
    { text: 'product', mode: "light", position: [2, -2, 0], rotation: 0, scale: [1.2, 1.2, 1], zIndex: 2 },
]

type SkillTagProps = {
    text: string
    mode: 'dark' | 'light'
    position: [number, number, number]
    scale: [number, number, number]
    rotation: number
}

function SkillTag({ text, mode, position, scale, rotation }: SkillTagProps) {
    const size = useScreenSize()
    const isMobile = size.isMobile
    const isTablet = size.isTablet
    const variation = isMobile ? 0.6 : isTablet ? 0.86 : 0.8
    position = [position[0] * variation, position[1] * variation, position[2] * variation]
    return (
        <group position={position} scale={scale}>
            <Html
                center
                transform={false}
                className='text-lg sm:text-2xl md:text-3xl lg:text-4xl -translate-x-10'
                style={{
                    transform: `rotate(${rotation}deg)`,
                    color: mode === 'dark' ? '#2d241b' : '#fffbe2',
                    fontWeight: 700,
                    fontFamily: 'Gabarito, sans-serif',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    background: mode === 'dark' ? '#fffbe2' : '#2d241b',
                    borderRadius: '0.4em',
                    padding: '0.18em 0.9em',
                    boxShadow: '0 2px 12px #0001',
                    border: 'none',
                }}
            >
                {text}
            </Html>
        </group>
    )
}

function SkillsGroup({ mouse }: { mouse: { x: number; y: number } }) {
    const group = useRef<THREE.Group>(null)

    // Usar las posiciones y escalas fijas
    const tags3D = useMemo(() => skills.map(skill => ({
        ...skill,
        position: skill.position as [number, number, number],
        scale: skill.scale as [number, number, number],
    })), [])

    const target = useRef({ x: 0, y: 0 })
    useFrame(() => {
        target.current.x += (mouse.x * 0.4 - target.current.x) * 0.08
        target.current.y += (-mouse.y * 0.2 - target.current.y) * 0.08
        if (group.current) {
            group.current.rotation.y = target.current.x
            group.current.rotation.x = target.current.y
        }
    })

    return (
        <group ref={group}>
            {tags3D.map((tag, i) => (
                <SkillTag 
                    key={i} 
                    position={tag.position}
                    scale={tag.scale}
                    text={tag.text}
                    mode={tag.mode as "dark" | "light"}
                    rotation={tag.rotation}
                />
            ))}
        </group>
    )
}

export default function SkillsCloud() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            })
        }
        window.addEventListener('mousemove', handle)
        return () => window.removeEventListener('mousemove', handle)
    }, [])

    return (
        <div className="w-full h-full overflow-hidden">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <SkillsGroup mouse={mouse} />
            </Canvas>
        </div>
    )
}
