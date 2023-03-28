import {
    Button,
    ButtonBase,
    Card, CardActionArea,
    CardActions,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent,
    DialogTitle,
    Grid, List, ListItem,
    Typography,
    withStyles
} from "@mui/material";
import {create} from "zustand";
import Immutable from "immutable";
import {Map} from "immutable"
import {event} from "next/dist/build/output/log";
import React from "react";
import {Label} from "@mui/icons-material";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

export const url_24hr_endpoint = 'https://binance43.p.rapidapi.com/ticker/24hr'
const api_key = 'fe090460camsh6e6ebf6c31d6427p1d1fd7jsn3f4a011f95c5'
const host = 'binance43.p.rapidapi.com'
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('X-RapidAPI-Key', api_key);
requestHeaders.set('X-RapidAPI-Host', host)
export type TradingBySymbol = Immutable.Map<string, ITrading>

export interface ITradingStore {
    all24HrData: ITrading[],
    tradingBySymbol: TradingBySymbol
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

export interface ITradable {
    retrieve24HrData: (ITrading) => void
}

const styles = {
    cardAction: {
        display: 'block',
        textAlign: 'initial'
    }
}
export const useTicker24Hr = create<ITradingStore & ITradable>((set, get) => ({ //data
    all24HrData: [],
    tradingBySymbol: Map(),
    retrieve24HrData: async (url_24_hrs) => {
        const resp = await fetch(url_24_hrs, {
                method: 'GET',
                headers: requestHeaders,
            }
        )
        const json = await resp.json()
        set(state => ({
            tradingBySymbol: Map<string, ITrading>(json.map((trading) => {
                return [trading.symbol, trading]
            })),
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
                    quoteVolume: trading.quoteVolume,
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

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: ITrading;
    onClose: (value: boolean) => void;
    setOpen: Function
}

function SimpleDialog(props: SimpleDialogProps) {
    const {onClose, setOpen, selectedValue, open} = props;

    const handleClose = () => {
        console.log("clicked")
        setOpen(false);
    };

    const handleListItemClick = (value: ITrading) => {
        onClose(true);
    };
    console.log(`dialog state is: ${open}`)

    return (
        <Dialog open={open}>
            <DialogTitle>{selectedValue.symbol}</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        Price change: {selectedValue.priceChange}
                    </ListItem>
                    <ListItem>
                        Price change (percentage): {selectedValue.priceChangePercent}
                    </ListItem>
                    <ListItem>
                        Previous close Price: {selectedValue.prevClosePrice}
                    </ListItem>
                    <ListItem>
                        Asked Price: {selectedValue.askPrice}
                    </ListItem>
                    <ListItem>
                        Bid Price: {selectedValue.bidPrice}
                    </ListItem>
                    <ListItem>
                        Asked Quantity: {selectedValue.askQty}
                    </ListItem>
                    <ListItem>
                        Last Price: {selectedValue.lastPrice}
                    </ListItem>
                </List>


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}


function BinanceTrading({content}) {
    const allTradingBySymbol = useTicker24Hr(state => state.tradingBySymbol)
    const [selectedValue, setSelectedValue] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value: boolean) => {
        setOpen(false);
    };
    return (
        <Grid item xs={12} sm={6} md={3} key={content.id}>
            <Card key={content.firstId} sx={{minWidth: 275}}>
                <CardActionArea onClick={handleClickOpen}>
                    <CardHeader
                        title={`${content.symbol}`}
                    />
                    <CardContent>
                        <Typography sx={{fontSize: 16}} color="text.secondary" gutterBottom>
                            {content.priceChange}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {content.priceChangePercent}
                        </Typography>
                        <Typography variant="body2">
                            {content.weightedAvgPrice}
                        </Typography>
                    </CardContent>
                    <SimpleDialog
                        selectedValue={content}
                        open={open}
                        onClose={handleClose}
                        setOpen={setOpen}
                    />
                </CardActionArea>
            </Card>
        </Grid>

    )

}

export default function Binance() {
    const getTradingData = useTicker24Hr(state => state.retrieve24HrData)
    const allTradingData = useTicker24Hr(state => state.all24HrData)


    return (

        <div>
            <button onClick={() => {
                getTradingData(url_24hr_endpoint)
            }}>Fetch Data
            </button>
            <h1>This is Binance {allTradingData.length}</h1>
            <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start">
                {allTradingData.map((aData) => {
                    return (
                        <BinanceTrading content={aData}/>
                    )
                })}
            </Grid>

        </div>
    );
}
