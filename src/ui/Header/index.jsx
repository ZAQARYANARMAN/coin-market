import { Link, NavLink } from "react-router-dom"
import styles from "./style.module.css"

function Header() {

    const activOrNo = ({ isActive }) => isActive ? styles.activLink : styles.link;

    return (
        <div className={styles.container}>
            <div className={styles.linkListContainer}>
                <NavLink to="/" className={activOrNo}>Home</NavLink>
                <NavLink to="/basket" className={activOrNo}>Basket</NavLink>
                <NavLink to="/buycoins" className={activOrNo}>Coins</NavLink>
            </div>
        </div>
    )
}

export default Header