import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./style.module.css";
import { basketCoins, basketResult, coins } from "../../helpers/storage/storage";
import { triggerAnimation, pandingAnimate } from "../../helpers/animations/flyingCoinAnim/flyingCoinAnim";
import { BiCartAdd } from "react-icons/bi";
import Card from "../Card";
import IconWithToolltip from "../IconWithTolltip";

function Coin({ element }) {
    const [ubdateCoins, setUbdateCoins] = useRecoilState(coins);
    const [ubdateBasketCoins, setUbdateBasketCoins] = useRecoilState(basketCoins);
    const [animations, setAnimations] = useState([])

    function formatMarketCap(number) {
        if (number >= 1_000_000_000_000) return (number / 1_000_000_000_000).toFixed(2) + 'T';
        else if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(2) + 'B';
        else if (number >= 1_000_000) return (number / 1_000_000).toFixed(2) + 'M';
        else if (number >= 1_000) return (number / 1_000).toFixed(2) + 'K';
        else return number.toString();
    }

    function formatChangePercent(percent) {
        const sign = percent >= 0 ? '+' : '';
        return sign + percent.toFixed(2) + '%';
    }

    const addCoin = () => {
        let fakeBasketCoins = {};
        fakeBasketCoins[element.name] = JSON.parse(JSON.stringify(ubdateCoins[element.name]));
        if (ubdateBasketCoins[element.name]) {
            fakeBasketCoins[element.name] = JSON.parse(JSON.stringify(ubdateBasketCoins[element.name]));
            fakeBasketCoins[element.name].price += ubdateCoins[element.name].defaultPrice;
            fakeBasketCoins[element.name].count++
        }

        setUbdateBasketCoins({ ...ubdateBasketCoins, ...fakeBasketCoins });
        triggerAnimation(animations, setAnimations, element.image, "10px", "34.8%", window.innerWidth * 65 / 100)
    };

    return (
        <Card element={element}>
            <div className={styles.rightPart}>
                <h4>${element.defaultPrice}</h4>
                <h3 className={element.priceChange > 0 ? styles.priceOne : styles.priceTwo}>{formatChangePercent(element.priceChange)}</h3>
                <h4>{formatMarketCap(element.marketCap)}</h4>
                <IconWithToolltip icon={BiCartAdd} onClick={addCoin} text="add" />
                {pandingAnimate(animations)}
            </div>
        </Card>
    );
}

export default Coin;