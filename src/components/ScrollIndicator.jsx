import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`scroll-indicator ${hidden ? 'hidden' : ''}`}>
      <div className="scroll-indicator-line" />
      <span className="scroll-indicator-text">Scroll</span>
    </div>
  )
}
