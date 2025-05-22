import { useRecoilState } from "recoil";
import styles from "./style.module.css";
import { basketCoins, purchasedCoins, wallet } from "../../helpers/storage/storage";
import { BiCartAdd } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Card from "../Card";
import { useRef, useState } from "react";
import { triggerAnimation, pandingAnimate } from "../../helpers/animations/flyingCoinAnim/flyingCoinAnim";
import { IoWalletOutline } from "react-icons/io5";
import IconWithTooltip from "../IconWithTolltip";

function BasketCoins({ element }) {
    const [ubdateBasketCoins, setUbdateBasketCoins] = useRecoilState(basketCoins);
    const [ubdatedPurchasedCoins, setUbdatedPurchasedCoins] = useRecoilState(purchasedCoins);
    const [ubdatedWallet, setUbdatedWallet] = useRecoilState(wallet);
    const [animations, setAnimations] = useState([]);

    const deletedCoins = (action) => {
        const fakeBasketCoins = JSON.parse(JSON.stringify(ubdateBasketCoins));
        delete fakeBasketCoins[element.name];
        setUbdateBasketCoins({ ...fakeBasketCoins });
    }

    const decreaseCoin = (event) => {
        const fakeBasketCoins = {};
        fakeBasketCoins[element.name] = JSON.parse(JSON.stringify(ubdateBasketCoins[element.name]));
        const icon = event.currentTarget;
        icon.style.color = "green";
        triggerAnimation(animations, setAnimations, element.image, "10px", "48.5%", -window.innerWidth * 65 / 100);
        if (fakeBasketCoins[element.name].count > 1) {
            fakeBasketCoins[element.name].price -= fakeBasketCoins[element.name].defaultPrice;
            fakeBasketCoins[element.name].count--;
            setUbdateBasketCoins({ ...ubdateBasketCoins, ...fakeBasketCoins });
        } else {
            setTimeout(() => deletedCoins(), 900);
        }
        setTimeout(() => icon.style.color = "white", 700);
    }

    const buy = (event) => {
        const icon = event.currentTarget;

        if (ubdateBasketCoins[element.name].price <= ubdatedWallet) {
            const fakeBuyCoin = {}
            fakeBuyCoin[element.name] = JSON.parse(JSON.stringify(ubdateBasketCoins[element.name]));
            if (ubdatedPurchasedCoins[element.name]) {
                fakeBuyCoin[element.name] = { ...ubdatedPurchasedCoins[element.name] };
                fakeBuyCoin[element.name].price += ubdateBasketCoins[element.name].price;
                fakeBuyCoin[element.name].count += ubdateBasketCoins[element.name].count;
            }

            icon.style.color = "green"
            triggerAnimation(animations, setAnimations, element.image, "10px", "48.5%", window.innerWidth * 85 / 100)
            setUbdatedPurchasedCoins({ ...ubdatedPurchasedCoins, ...fakeBuyCoin })
            setTimeout(() => deletedCoins(), 900)
        } else {
            icon.style.color = "rgba(220, 20, 60, 0.85)";
        }

        setTimeout(() => icon.style.color = "white", 700);
    }

    return (
        <Card element={element}>
            <div className={styles.rightPart}>
                <h4>${Math.round(element.price)}</h4>
                <h4>{element.count}</h4>
                <div className={styles.rightSmallContainer}>
                    <IconWithTooltip icon={IoWalletOutline} onClick={buy} text="buy" />
                    <IconWithTooltip icon={MdDeleteOutline} onClick={decreaseCoin} text="delete" />
                    {pandingAnimate(animations)}
                </div>
            </div>
        </Card>
    )
}

export default BasketCoins