import {Typography, Stack, styled, Box} from "@mui/material"

const Title = styled(Typography)(({theme}) => ({
    backgroundColor: 'whitesmoke',
    ...theme.typography.body2,
    // padding: theme.spacing(0.5),
    textAlign: 'center',
    color: 'black',
    padding: theme.spacing(0.3),
    variant: "body1",
    flexGrow: 1,
    margin: theme.spacing(1),
    height: '38px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '25px',
    lineHeight: '30px'
}));



export default function SCardTitle({sId}) {
    return (
        <Stack>
            <Box sx={{display: 'flex', alignItems: 'left'}}>
                <Title>{sId}</Title>
            </Box>
        </Stack>
    )
}