import React from "react";
import {
    Button, Card, CardActionArea, CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {DialogProps} from "@mui/material/Dialog/Dialog";

function CreateDialog({dialogInput}) {
    return (
        <Dialog fullScreen={dialogInput.fullScreen} open={dialogInput.open} onClose={dialogInput.onClose}
                aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                {"Use Google's location service?"}
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

    const dialogParams={
        fullScreen: fullScreen,
        open:open,
        onClose: handleClose
    }

    return (

        <div>
            <Grid item xs={12} sm={6} md={3} key="test">
                <Card sx={{minWidth: 275}}>

                    <CardActionArea onClick={handleClickOpen}>
                        <CardHeader title="Testing"/>
                    </CardActionArea>
                    <CreateDialog dialogInput={dialogParams} />


                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} key="test2">
                <Card sx={{minWidth: 275}}>

                    <CardActionArea onClick={handleClickOpen}>
                        <CardHeader title="Testing"/>
                    </CardActionArea>
                    <CreateDialog dialogInput={dialogParams} />

                </Card>
            </Grid>


        </div>
    )

}