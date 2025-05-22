import Card from "../Card";
import styles from "./style.module.css";

function BuyCoin({ element }) {
    return (
        <Card element={element}>
            <div className={styles.rightPart}>
                <h4>${element.price}</h4>
                <h4>count: {element.count}</h4>
            </div>
        </Card>
    )
}

export default BuyCoin