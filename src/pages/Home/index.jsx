import styles from "./style.module.css"
import { useEffect, useState } from "react"
import { coins } from "../../helpers/storage/storage";
import Fetch from "../../helpers/Fetch/Fetch"
import { useRecoilState } from "recoil";
import Coin from "../../component/Coin";
import { IoSearchOutline } from "react-icons/io5";

function Home() {
    const [ubdateCoins, setUbdateCoins] = useRecoilState(coins);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const helpFetch = async () => {
            const fakeCoins = {};
            const data = await Fetch("usd");

            data.forEach(element => {
                fakeCoins[element.name] = {
                    image: element.image,
                    name: element.name,
                    symbol: element.symbol,
                    price: element.current_price,
                    defaultPrice: element.current_price,
                    count: 1,
                    priceChange: element.price_change_percentage_24h,
                    marketCap: element.market_cap
                }
            })
            setUbdateCoins(fakeCoins);
        }
        helpFetch();
    }, [])

    const filteredCoins = element => element.name.toUpperCase().startsWith(searchValue.toUpperCase())
    const changeSearchValue = (event) => setSearchValue(event.target.value);

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <IoSearchOutline className={styles.searchIcon} />
                <input type="text" placeholder=" " onChange={changeSearchValue} />
            </div>
            {
                Object.values(ubdateCoins).filter(filteredCoins).map((element, index) => {
                    return (
                        <Coin element={element} key={index} />
                    )
                })
            }
        </div>
    )
}

export default Home