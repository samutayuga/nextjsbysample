import type {AppProps} from "next/app";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from "../themes/dark";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <Component {...pageProps} />
            </CssBaseline>
        </ThemeProvider>
    )
}