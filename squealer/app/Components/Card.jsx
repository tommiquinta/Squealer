export default function Card ({ children, noPadding, isNavbar}) {
  let classes = 'bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-0';
  if(!noPadding){
      classes += ' p-4';
  }
  if(isNavbar){
    classes += ' fixed';
}
  return (
    <div className={`${classes}`}>{children}</  div>
  )
}
