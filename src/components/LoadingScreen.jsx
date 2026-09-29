export default function LoadingScreen({ loaded }) {
  return (
    <div className={`loading-screen ${loaded ? 'loaded' : ''}`}>
      <div className="loading-spinner" />
      <p className="loading-text">Loading Experience</p>
    </div>
  )
}
