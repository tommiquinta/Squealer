export default function Avatar ({ url, size}) {

  let sizeWidth = '75px';
  if(size === 'big'){
    width = '100px';
  }
  return (
    <div className='relative rounded-full overflow-hidden'>
      <div
        style={{
          width: sizeWidth,
          height: '75px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '0 auto' // Centra orizzontalmente
        }}
      >
        <img
          src={url}
          alt=''
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
