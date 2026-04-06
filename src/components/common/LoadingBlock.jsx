export default function LoadingBlock({ title, description }) {
  return (
    <div className="loading-block">
      <div className="loading-orbit" />
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  )
}
