import Axios from "axios";

const Api = Axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/cryptocurrency",
  headers: {
    "X-CMC_PRO_API_KEY": process.env.REACT_APP_APY_KEY_COIN_MARKET_CAP,
  },
});

export default Api;
