export default function Avatar ({ url, size}) {

  let sizeWidth = 'w-12 h-12';
  if(size === 'big'){
    sizeWidth = 'w-24 h-24';
  }
  return (
    <div className={`${sizeWidth} relative rounded-full overflow-hidden`}>
      <div
        style={{
          overflow: 'hidden',
          margin: '0 auto' // Centra orizzontalmente
        }}
      >
        <img
          src={url}
          alt='profile pic'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
