import { Suspense, useState, useCallback, useEffect } from 'react'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import LoadingScreen from './components/LoadingScreen'
import NoiseOverlay from './components/NoiseOverlay'
import BlogPost from './components/blog/BlogPost'
import BlogList from './components/blog/BlogList'

function getNormalizedRoute() {
  const path = (window.location.pathname || '').toLowerCase()
  const hash = (window.location.hash || '').toLowerCase()
  
  if (path.includes('/blogs/snb-00') || path.includes('/blog/snb-00') || hash.includes('/blogs/snb-00') || hash.includes('snb-00')) {
    return 'blog-post'
  }
  if (path === '/blogs' || path === '/blogs/' || path === '/blog' || path === '/blog/' || hash === '#/blogs' || hash === '#blogs' || hash.includes('blog')) {
    return 'blog-list'
  }
  return 'portfolio'
}

export default function App() {
  const [route, setRoute] = useState(getNormalizedRoute)
  const [loaded, setLoaded] = useState(false)

  const handleLoaded = useCallback(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const newRoute = getNormalizedRoute()
      setRoute(newRoute)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (route === 'blog-post' || route === 'blog-list') {
      document.body.classList.add('blog-mode')
    } else {
      document.body.classList.remove('blog-mode')
    }
  }, [route])

  const handleNavigate = (path, targetSection) => {
    window.history.pushState({}, '', path)
    const newRoute = getNormalizedRoute()
    setRoute(newRoute)
    
    if (newRoute === 'portfolio' && targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection) || document.querySelector(`.${targetSection}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }

  if (route === 'blog-post') {
    return <BlogPost onNavigate={handleNavigate} />
  }

  if (route === 'blog-list') {
    return <BlogList onNavigate={handleNavigate} />
  }

  return (
    <>
      <LoadingScreen loaded={loaded} />

      {/* Fixed 3D Canvas Background */}
      <div className="canvas-container">
        <Scene onLoaded={handleLoaded} />
      </div>

      {/* Noise grain — between canvas and text only on 3D portfolio */}
      <NoiseOverlay />

      {/* Scrollable HTML Overlay */}
      <Overlay onNavigate={handleNavigate} />
    </>
  )
}
