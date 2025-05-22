import styles from "./style.module.css";
import { motion } from "framer-motion";

function Card({children, element}) {
    return (
        <div className={styles.container}>
            <div className={styles.leftPart}>
                <motion.img src={element.image} alt={element.symbol} width="24px" height="24px" whileHover={{ scale: 1.2 }} />
                <h2 className={styles.coinSymbol}>{element.symbol.toUpperCase()}</h2>
                <h3 className={styles.coinName}>{element.name}</h3>
            </div>
            {children}
        </div>
    )
}

export default Card