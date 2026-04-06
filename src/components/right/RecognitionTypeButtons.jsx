export default function RecognitionTypeButtons({ types, activeType, onChange }) {
  return (
    <div className="recognition-grid">
      {types.map((item) => (
        <button
          key={item.key}
          className={`rec-btn ${activeType === item.key ? 'active' : ''}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
