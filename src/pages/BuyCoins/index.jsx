import styles from "../Home/style.module.css";
import { purchasedCoins } from "../../helpers/storage/storage";
import { useRecoilState } from "recoil";import BuyCoin from "../../component/BuyCoin";
;

function BuyCoins() {
    const [ubdatedPurchasedCoins, setUbdatedPurchasedCoins] = useRecoilState(purchasedCoins);
    
    return (
        <div className={styles.container}>
            {
                Object.values(ubdatedPurchasedCoins).map((element, index) => <BuyCoin key={index} element={element} />)
            }
        </div>
    )
}

export default BuyCoins