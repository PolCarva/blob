'use client'
import { useEffect, useRef } from 'react'

const svgText = encodeURIComponent(`
  <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f97316"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-size="80" font-family="sans-serif" font-weight="bold" fill="white">
      Pablo Carvalho
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