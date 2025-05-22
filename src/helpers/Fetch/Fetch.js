export default async function (currency) {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`)
      const data = await response.json()
      return data
}