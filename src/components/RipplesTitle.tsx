'use client'
import { useEffect, useRef } from 'react'

const svgText = encodeURIComponent(`
  <svg width="100vw" height="100vh" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="0.5" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <filter id="texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="0.2" stitchTiles="stitch"/>
        <feDisplacementMap in="SourceGraphic" scale="1"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#010101" filter="url(#noise)" opacity="0.05"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-size="10vw" font-family="Gabarito" font-weight="bold" fill="#fafafa" filter="url(#texture)">
      pablo carvalho
    </text>
  </svg>
  
`)

export default function RipplesTitle() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    // Carga jQuery si no está presente
    function loadScript(src: string) {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        document.body.appendChild(script)
      })
    }

    async function setupRipples() {
      // Carga jQuery si no existe
      if (!('jQuery' in window)) {
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
      }
      // Carga el plugin si no existe
      if (!('ripples' in (window as any).jQuery.fn)) {
        await loadScript('https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js')
      }
      // Aplica el efecto
      if (ref.current && (window as any).jQuery) {
        (window as any).jQuery(ref.current).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        })
      }
    }

    setupRipples()

    return () => {
      // Limpia el efecto al desmontar
      if (ref.current && (window as any).jQuery && (window as any).jQuery.fn.ripples) {
        (window as any).jQuery(ref.current).ripples('destroy')
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgText}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
} 