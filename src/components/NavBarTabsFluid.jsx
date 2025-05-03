'use client'
import { useRef, useState, useLayoutEffect } from 'react'

const tabs = [
    {
        label: 'Intro', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12L12 4l9 8" /><path d="M4 10v10h16V10" /></svg>
        )
    },
    {
        label: 'Work', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
        )
    },
    {
        label: 'About', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
        )
    }
]

const contactIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1" /><path d="M21 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" /><path d="m3 8 9 6 9-6" /></svg>
)

export function NavBarTabsFluid() {
    const [active, setActive] = useState(0)
    const tabRefs = useRef([])
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const prevActive = useRef(0)

    useLayoutEffect(() => {
        const node = tabRefs.current[active]
        const prevNode = tabRefs.current[prevActive.current]
        if (node && prevNode) {
            const { offsetLeft, offsetWidth } = node
            const { offsetLeft: prevLeft, offsetWidth: prevWidth } = prevNode
            const direction = active > prevActive.current ? 'right' : 'left'

            if (direction === 'right') {
                // Estira a la derecha
                setIndicatorStyle({ left: prevLeft, width: (offsetLeft + offsetWidth) - prevLeft })
                setTimeout(() => {
                    setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
                }, 120)
            } else if (direction === 'left') {
                // Estira a la izquierda
                setIndicatorStyle({ left: offsetLeft, width: (prevLeft + prevWidth) - offsetLeft })
                setTimeout(() => {
                    setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
                }, 120)
            } else {
                setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
            }
            prevActive.current = active
        }
    }, [active])

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
            <div className="relative flex bg-white/90 backdrop-blur-md rounded-full px-2 py-1 shadow-lg min-w-[320px] w-auto pointer-events-auto gap-1">
                {/* Liquid Bubble */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 h-[44px] rounded-full bg-black transition-all duration-200 ease-[cubic-bezier(.7,1.5,.5,1)] z-10"
                    style={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width,
                        height: '44px',
                    }}
                />
                {/* Tabs */}
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        ref={el => tabRefs.current[i] = el}
                        className={`relative z-20 flex items-center cursor-pointer justify-center h-11 px-6 font-semibold text-lg transition-colors duration-200 rounded-full focus:outline-none ${active === i ? 'text-white' : 'text-black'}`}
                        onClick={() => setActive(i)}
                        style={{ background: 'transparent' }}
                    >
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.icon}</span>
                    </button>
                ))}
                <button
                    className="relative z-20 bg-black cursor-pointer hover:bg-black/80 flex items-center justify-center h-11 px-6 font-semibold text-lg transition-colors duration-200 rounded-full focus:outline-none text-white shadow-md"
                >
                    <span className="hidden sm:inline">Contact Me</span>
                    <span className="sm:hidden">{contactIcon}</span>
                </button>
            </div>
        </nav>
    )
}

export default NavBarTabsFluid 