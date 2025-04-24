import { useState, useEffect } from 'react'

export function useTouch() {
  const [hasTouch, setHasTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    checkTouch()
    window.addEventListener('resize', checkTouch)

    return () => {
      window.removeEventListener('resize', checkTouch)
    }
  }, [])

  return { hasTouch }
} 