export default function Avatar ({ url }) {
  return (
    <div className={`{width} relative rounded-full overflow-hidden`}>
      <div
        style={{
          maxWidth: '75px', // Imposta la larghezza massima del contenitore
          maxHeight: '75px', // Imposta l'altezza massima del contenitore
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      >
        <img
          src={url}
          alt=''
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
