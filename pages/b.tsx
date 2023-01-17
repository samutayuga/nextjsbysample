import Stack from '@mui/material/Stack';
import {Button, Container, Paper, styled} from '@mui/material';
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from "../themes/dark";
import CssBaseline from "@mui/material/CssBaseline";
import fruites from "../config/fruits.json";
import {IFruit} from "./index";
import {json} from "stream/consumers";

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
                <Stack spacing={2}>
                    {data.map((sess) => {
                            console.log(sess)
                        const sessData=JSON.parse(sess.sessionData)

                            return (<Item key={sess.sessionId}>{sess.sessionId}/{sess.templateName}/{sess.createdBy}/{sessData.sessionName}</Item>)
                        }
                    )}

                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export async function getServerSideProps() {
    const res = await fetch(`http://127.0.0.1:8888/session/list`)
    const data = await res.json()

    return {props: {data}}
}
