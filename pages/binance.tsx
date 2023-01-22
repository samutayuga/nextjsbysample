import {Grid} from "@mui/material";
import {create} from "zustand";

const url_24hr_endpoint = 'https://binance43.p.rapidapi.com/ticker/24hr'
const api_key = 'fe090460camsh6e6ebf6c31d6427p1d1fd7jsn3f4a011f95c5'
const host = 'binance43.p.rapidapi.com'
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('X-RapidAPI-Key', api_key);
requestHeaders.set('X-RapidAPI-Host', host)

export interface ITradingStore {
    all24HrData: ITrading[]
}

export interface ITrading {
    symbol: string
    priceChange: number
    priceChangePercent: number
    weightedAvgPrice: number
    prevClosePrice: number
    lastPrice: number
    lastQty: number
    bidPrice: number
    bidQty: number
    askPrice: number
    askQty: number
    openPrice: number
    highPrice: number
    lowPrice: number
    volume: number
    quoteVolume: number
    openTime: number
    closeTime: number
    firstId: number
    lastId: number
    count: number

}

export interface ITradable{
    retrieve24HrData:(ITrading) => void
}
const useTicker24Hr = create<ITradingStore & ITradable >((set) => ({ //data
    all24HrData: [],
    retrieve24HrData: async (url_24_hrs) => {
        const resp = await fetch(url_24_hrs, {
                method: 'GET',
                headers: requestHeaders,
            }
        )
        const json = await resp.json()
        set(state => ({
            all24HrData: json.map((trading) => {
                return {
                    ...trading,
                    symbol: trading.symbol,
                    priceChange: trading.priceChange,
                    priceChangePercent: trading.priceChangePercent,
                    weightedAvgPrice: trading.weightedAvgPrice,
                    prevClosePrice: trading.prevClosePrice,
                    lastPrice: trading.lastPrice,
                    lastQty: trading.lastQty,
                    bidPrice: trading.bidPrice,
                    bidQty: trading.bidQty,
                    askPrice: trading.askPrice,
                    askQty: trading.askQty,
                    openPrice: trading.openPrice,
                    highPrice: trading.highPrice,
                    lowPrice: trading.lowPrice,
                    volume: trading.volume,
                    quoteVolume:  trading.quoteVolume,
                    openTime: trading.openTime,
                    closeTime: trading.closeTime,
                    firstId: trading.firstId,
                    lastId: trading.lastId,
                    count: trading.count
                }
            })
        }))


    },


}))

export default function Binance() {
    const getTradingData=useTicker24Hr(state => state.retrieve24HrData)
    const allTradingData=useTicker24Hr(state => state.all24HrData)

    return (

        <div>
            <button onClick={() => {
                getTradingData(url_24hr_endpoint)
            }}>Fetch Data
            </button>
            <h1>This is Binance  {allTradingData.length}</h1>

        </div>
    );
}