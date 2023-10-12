export default function Card({ children, noPadding, isNavbar, add }) {
    let classes = 'bg-white shadow-md shadow-gray-300 rounded-lg mb-5 p-0';
    if (!noPadding) {
        classes += ' p-4';
    }
    if (isNavbar) {
        classes += ' md:fixed';
    }
    return (
        <div className={`${classes} ${add}`}>{children}</  div>
    )
}