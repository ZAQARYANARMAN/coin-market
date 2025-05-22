import { Route, Routes } from "react-router-dom"
import styles from "./style.module.css"
import Home from "../../pages/Home"
import Basket from "../../pages/Basket"
import BuyCoins from "../../pages/BuyCoins"

function Main() {
    return (
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/buycoins" element={<BuyCoins />} />
            </Routes>
        </div>
    )
}

export default Main