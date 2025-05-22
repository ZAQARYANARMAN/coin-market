import { atom } from "recoil";

const coins = atom({
    key: "this key for coins information",
    default: {},
})

const basketCoins = atom({
    key: "this key for basket coins",
    default: {},
})

const purchasedCoins = atom({
    key: "this key for buy coins",
    default: {},
})

const wallet = atom({
    key: "this key for wallet",
    default: 700000,
})

export { coins, basketCoins, purchasedCoins, wallet }