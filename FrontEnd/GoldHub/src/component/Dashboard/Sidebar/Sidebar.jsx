import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar({ isDraft }){
    const links = [
        {icons: "fa-chart-line", title: "Status", path: "/"},
        {icons: "fa-users", title: "User management", path: "/users"},
        // {icons: "fa-building", title: "Projects management", path: "/projects"},
        {icons: "fa-shop", title: "Shop Owner"},
        // {icons: "fa-globe", title: "CMS"},
        {icons: "fa-message", title: "Live Chat"}
    ]
    return(
      <aside className={`${styles.sidebar} min-vh-100 py-4`}>
        <div className='fw-semibold px-3 fs-4 mb-2'>Dashboard</div>
        <nav>
           {links.map((item, index) => (
            <NavLink to={item.path} className={`${styles.navItem} d-flex align-items-center gap-3`} key={index}>
                <i className={`fa-solid ${item.icons}`}></i>
                <span className="fs-5">{item.title}</span>
                {item.title === "User management" && isDraft && (
    <span className="badge bg-danger ms-2">
        Draft
    </span>
)}
            </NavLink>
           ))}
        </nav>
      </aside>
    );
    
}
export default Sidebar; 