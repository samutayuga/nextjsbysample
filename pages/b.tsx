import Stack from '@mui/material/Stack';
import {Box, Button, Container, Divider, Paper, styled} from '@mui/material';
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from "../themes/dark";
import CssBaseline from "@mui/material/CssBaseline";
import fruites from "../config/fruits.json";
import {IFruit} from "./index";
import {json} from "stream/consumers";
import SCardTitle from "../providers/STitle";

export interface ISession {
    id: string
    createdBy: string
    description: string
}

export default function Main({data}) {
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));
    return (

        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Container maxWidth="sm">
                {data.map((sess) => {
                    console.log(sess)
                    const sessData = JSON.parse(sess.sessionData)


                    return (
                        <Box>
                            <SCardTitle sId={sess.sessionId}/>
                            <Stack spacing={2} key={sess.sessionId}>
                                <Item>{sess.templateName}</Item>
                            </Stack>
                            <Stack spacing={2} key={sess.sessionId}>
                                <Item>{sess.sessionState}</Item>
                            </Stack>
                            <Stack spacing={2} key={sess.sessionId}>
                                <Item>{sess.createdBy}</Item>
                            </Stack>
                        </Box>
                    )


                })}
            </Container>
        </ThemeProvider>
    );
}
    ;

    export async function getServerSideProps() {
        const res = await fetch(`http://127.0.0.1:8888/session/list`)
        const data = await res.json()

        return {props: {data}}
    }
