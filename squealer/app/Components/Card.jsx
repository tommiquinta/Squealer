export default function Card ({ children, noPadding }) {
  let classes = 'bg-white shadow-md shadow-gray-300 rounded-md mb-5 overflow-hidden p-4';
  if(noPadding){
      classes += 'p-0';
  }
  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-5'>{children}</  div>
  )
}
