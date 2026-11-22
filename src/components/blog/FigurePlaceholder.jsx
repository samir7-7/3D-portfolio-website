import { useState } from 'react'

export default function FigurePlaceholder({ src, figureId, name, caption, alt }) {
  const [hasError, setHasError] = useState(false)
  const imageSrc = src || (figureId ? `/SNB-00/${name}` : null)

  return (
    <figure className="blog-figure">
      {imageSrc && !hasError ? (
        <div className="blog-figure-box has-image">
          <img
            src={imageSrc}
            alt={alt || caption || name || 'Illustration'}
            className="blog-figure-image"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <div className="blog-figure-box">
          <div className="blog-figure-placeholder">
            <div className="placeholder-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="placeholder-label">{name || figureId}</div>
            <div className="placeholder-hint">Image left blank &bull; illustration to be provided</div>
          </div>
        </div>
      )}
      {caption && <figcaption className="blog-figcaption">{caption}</figcaption>}
    </figure>
  )
}
