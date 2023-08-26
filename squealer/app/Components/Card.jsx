export default function Card ({ children, noPadding }) {
  let classes = 'bg-white shadow-md shadow-gray-300 rounded-md mb-5 overflow-hidden p-4';
  if(noPadding){
      classes += 'p-0';
  }
  return (
    <div className={classes}>
      {children}
      </  div>
  )
}
