import {
    Card,
    CardActionArea, CardActions,
    CardContent,
    Grid,
    List,
    ListItem,
    Paper,
    styled, Table,
    Typography
} from '@mui/material';
import {
    createTheme, ThemeProvider
} from "@mui/material/styles";


import darkTheme from "../themes/dark";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import {green} from "@mui/material/colors";


export interface ISession {
    id: string
    createdBy: string
    description: string
}

interface IAssembly {
    name: string
    capabilities: ICapability[]
}

interface ICapability {
    name: string
    kind: string

}

function onSessionChoose(sessionId) {
    console.log(sessionId)
}


export default function Main({data}) {

    return (

        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start">
                {data.map((sess) => {
                    const sessData = JSON.parse(sess.sessionData)
                    //let assList = []
                    const kData = JSON.parse(sess.kubeData)
                    const activityList = JSON.parse(sess.activityData)


                    let assemblies = []

                    kData.map((aas) => {
                            const newAssembly: IAssembly = {
                                ...aas,
                                name: aas.name,
                                capabilities: aas.capabilities
                            }
                            assemblies.push(newAssembly)

                        }
                    )


                    return (

                        <Grid item xs={40} sm={2} md={3} key={sess.sessionId}>

                            <Card sx={{maxWidth: 400}} key={sess.sessionId}>
                                <CardActionArea onClick={() => onSessionChoose(sess.sessionId)}>
                                    <CardContent>
                                        <Typography paragraph>
                                            {sess.sessionId}
                                        </Typography>
                                        <Typography paragraph>
                                            {sess.createdBy}
                                        </Typography>
                                        {sess.sessionState === 'FAILED' ? (<Typography paragraph color="red">
                                            {sess.sessionState}
                                        </Typography>) : (
                                            sess.sessionState==='ACTIVE'?(
                                            <Typography paragraph color="green">
                                                {sess.sessionState}
                                            </Typography>
                                            ):(
                                                sess.sessionState==='PENDING'?(
                                                <Typography paragraph color="yellow">
                                                    {sess.sessionState}
                                                </Typography>
                                                ):(
                                                    <Typography paragraph>
                                                        {sess.sessionState}
                                                    </Typography>
                                                )
                                            )
                                        )

                                        }

                                        <Typography paragraph>
                                            {sess.templateName}
                                        </Typography>
                                        <Typography textTransform="uppercase">
                                            Join Url
                                        </Typography>
                                        <List>


                                            {

                                                activityList[0].actions.map((act) => {
                                                    return (<ListItem key={act.name}>{act.endPoint}</ListItem>)
                                                })

                                            }
                                        </List>
                                        <Typography textTransform="uppercase">
                                            Assembly List ({assemblies.length})
                                        </Typography>
                                        <List>
                                            {assemblies.map((anAssembly) => {
                                                return (
                                                    <>
                                                        <ListItem>{anAssembly.name} has {anAssembly.capabilities.length} capabilities</ListItem>
                                                        <ul>
                                                            {anAssembly.capabilities.map((aCapa) => {
                                                                return (
                                                                    <li>
                                                                        {aCapa.name}
                                                                    </li>

                                                                )
                                                            })
                                                            }
                                                        </ul>
                                                    </>

                                                )

                                            })}
                                        </List>
                                    </CardContent>
                                </CardActionArea>

                            </Card>


                        </Grid>
                    )

                })}
            </Grid>
        </ThemeProvider>
    );
}


export async function getServerSideProps() {
    const res = await fetch(`http://127.0.0.1:8888/session/list`)
    const data = await res.json()

    return {props: {data}}
}
