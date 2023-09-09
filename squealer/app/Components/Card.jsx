
export default function Card ({ children, noPadding, isNavbar, styles}) {
  let classes = 'bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-0';

  if(!noPadding){
      classes += ' p-4';
  }
  if(isNavbar){
    classes += ' fixed rounded-t-md rounded-b-none md:rounded-md';
}
  return (
    <div className={`${classes} ${styles}`}>{children}</  div>
  )
}
