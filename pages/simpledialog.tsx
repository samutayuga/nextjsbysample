import React from "react";

import {
    Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, IconButton, IconButtonProps, styled, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
import {url_24hr_endpoint, useTicker24Hr} from "./binance";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
function CreateDialog({dialogInput}) {

    return (
        <Dialog fullScreen={dialogInput.fullScreen} open={dialogInput.open} onClose={dialogInput.onClose}
                aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                {dialogInput.content}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={dialogInput.onClose}>
                    Disagree
                </Button>
                <Button onClick={dialogInput.onClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>


        </Dialog>
    )
}

export default function CardWithDialog() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
                {allTradingData.map(trading =>

                    <CreateCard params={{
                        firstId: trading.firstId,
                        symbol: trading.symbol,
                        fullScreen: fullScreen,
                        open: open,
                        openHandler: handleClickOpen,
                        closeHandler: handleClose,
                        content: trading.symbol

                    }} content={trading}/>
                )}


            </Grid>


        </div>
    )

}

function CreateCard({params,content}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Grid item xs={12} sm={6} md={3} key={params.firstId}>
            <Card sx={{maxWidth: 345}} key={params.firstId}>

                <CardHeader title={params.symbol}/>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>What is that?</Typography>
                        <Typography paragraph>
                           Price Change: {content.priceChange}
                        </Typography>
                        <Typography paragraph>
                            Price Change (in percentage): {content.priceChangePercent}
                        </Typography>
                        <Typography paragraph>
                            Asked Price:  {content.askPrice}
                        </Typography>
                        <Typography>
                            Asked Quantity:  {content.askQty}
                        </Typography>
                    </CardContent>
                </Collapse>

            </Card>
            <CreateDialog dialogInput={{
                fullScreen: params.fullScreen,
                open: params.open,
                onClose: params.closeHandler,
                content: params.symbol
            }}/>
        </Grid>
    )
}