import styles from "./style.module.css";
import { basketCoins, purchasedCoins, wallet } from "../../helpers/storage/storage";
import { useRecoilState } from "recoil";
import BasketCoins from "../../component/BasketCoin";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import IconWithTolltip from "../../component/IconWithTolltip";
import IconWithToolltip from "../../component/IconWithTolltip";

function Basket() {
    const [ubdateBasketCoins, setUbdateBasketCoins] = useRecoilState(basketCoins);
    const [ubdatedPurchasedCoins, setUbdatedPurchasedCoins] = useRecoilState(purchasedCoins);
    const [ubdateWallet, setUbdatedWallet] = useRecoilState(wallet);
    const [generalPrice, setGeneralPrice] = useState(0);

    useEffect(() => {
        let generalPriceSum = 0;
        Object.values(ubdateBasketCoins).forEach(element => generalPriceSum += element.price);
        setGeneralPrice(generalPriceSum);
    }, [ubdateBasketCoins])

    const clear = (event, action) => setUbdateBasketCoins({});

    const buyCoins = (event) => {
        const icon = event.currentTarget;
        if (generalPrice <= ubdateWallet) {
            const fakeUbdatedBasketCoins = JSON.parse(JSON.stringify(ubdateBasketCoins));
            const fakeUbdatedPurchasedCoins = JSON.parse(JSON.stringify(ubdatedPurchasedCoins));

            Object.values(fakeUbdatedBasketCoins).forEach(element => {
                if (fakeUbdatedPurchasedCoins[element.name]) {
                    fakeUbdatedPurchasedCoins[element.name].count += fakeUbdatedBasketCoins[element.name].count;
                    fakeUbdatedPurchasedCoins[element.name].price += fakeUbdatedBasketCoins[element.name].price;
                } else {
                    fakeUbdatedPurchasedCoins[element.name] = fakeUbdatedBasketCoins[element.name];
                }
            })
            
            icon.style.color = "green";
            setUbdatedPurchasedCoins(fakeUbdatedPurchasedCoins);
            setTimeout(() => clear("hello"), 700);
        } else {
            icon.style.color = "rgba(220, 20, 60, 0.85)";
        }
        setTimeout(() => icon.style.color = "white", 700);
    }

    return (
        <div className={styles.container}>
            {
                Object.values(ubdateBasketCoins).length ? <div className={styles.topContainer}>
                    <IconWithTolltip icon={MdDeleteOutline} onClick={clear} text="delte all" />
                    <h2>{generalPrice}$</h2>
                    <IconWithToolltip icon={BiCartDownload} onClick={buyCoins} text="buy all" />
                </div> : ""
            }
            {Object.values(ubdateBasketCoins).map((element, index) => <BasketCoins key={index} element={element} />)}
        </div>
    )
}

export default Basket