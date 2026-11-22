import { useEffect } from 'react'
import './blog.css'

export default function BlogLayout({ children, activeNav = 'blog', onNavigate }) {
  useEffect(() => {
    document.body.classList.add('blog-mode')
    window.scrollTo(0, 0)
    return () => {
      document.body.classList.remove('blog-mode')
    }
  }, [])

  const handleHomeClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/')
    } else {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const handleBlogClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/blogs')
    } else {
      window.history.pushState({}, '', '/blogs')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const handleProjectsClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/', 'projects')
    } else {
      window.history.pushState({}, '', '/#projects')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const handleWorkClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/', 'work')
    } else {
      window.history.pushState({}, '', '/#work')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  return (
    <div className="blog-page-root">
      {/* Top Navbar matching the reference interface */}
      <header className="blog-header">
        <div className="blog-header-inner">
          <div className="blog-brand">
            <a href="/" onClick={handleHomeClick} className="blog-brand-link">
              ~/samir
            </a>
          </div>

          <nav className="blog-nav">
            <a
              href="/blogs"
              onClick={handleBlogClick}
              className={`blog-nav-link ${activeNav === 'blog' ? 'active' : ''}`}
            >
              blog
            </a>
            <span className="blog-nav-slash">/</span>
            <a
              href="/#projects"
              onClick={handleProjectsClick}
              className={`blog-nav-link ${activeNav === 'projects' ? 'active' : ''}`}
            >
              projects
            </a>
            <span className="blog-nav-slash">/</span>
            <a
              href="/#work"
              onClick={handleWorkClick}
              className={`blog-nav-link ${activeNav === 'work' ? 'active' : ''}`}
            >
              work
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="blog-main">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <p>© {new Date().getFullYear()} Samir Nepal. All thoughts and writings are my own.</p>
          <div className="blog-footer-links">
            <a href="https://github.com/samir7-7" target="_blank" rel="noreferrer">GitHub</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/samirnepal/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
