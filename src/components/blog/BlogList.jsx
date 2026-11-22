import BlogLayout from './BlogLayout'
import { BLOGS } from '../../data/blogs'

export default function BlogList({ onNavigate }) {
  const handleOpenPost = (slug) => (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(`/blogs/${slug}`)
    } else {
      window.history.pushState({}, '', `/blogs/${slug}`)
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const handleBackToHome = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/')
    } else {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  return (
    <BlogLayout activeNav="blog" onNavigate={onNavigate}>
      <div className="blog-list-container">
        <div className="blog-back-wrapper">
          <a href="/" onClick={handleBackToHome} className="blog-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back to portfolio</span>
          </a>
        </div>

        <div className="blog-list-header">
          <h1 className="blog-list-title">Writing</h1>
          <p className="blog-list-desc">
            Thoughts, philosophy, and practical intuitions on programming, math, and creative development.
          </p>
        </div>

        <div className="blog-list-items">
          {BLOGS.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-card-meta">
                <span className="blog-card-id">{post.id}</span>
                <span className="blog-card-dot">•</span>
                <time dateTime="2026-11-22">{post.date}</time>
                <span className="blog-card-dot">•</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="blog-card-title">
                <a href={`/blogs/${post.slug}`} onClick={handleOpenPost(post.slug)}>
                  {post.title}
                </a>
              </h2>

              <p className="blog-card-subtitle">{post.subtitle}</p>

              <p className="blog-card-excerpt">{post.description}</p>

              <div className="blog-card-footer">
                <a href={`/blogs/${post.slug}`} onClick={handleOpenPost(post.slug)} className="blog-read-more">
                  Read article &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </BlogLayout>
  )
}
