import {create} from "zustand";
import {Card, CardContent, CardHeader, Grid, Paper, styled, Typography} from "@mui/material";

const vaccine_life_url = 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/'
const api_key = 'fe090460camsh6e6ebf6c31d6427p1d1fd7jsn3f4a011f95c5'
const host = 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('X-RapidAPI-Key', api_key);
requestHeaders.set('X-RapidAPI-Host', host)

interface ITreatmentTracking {
    id: string
    country: string
    activeCases: number
    totalCases: number
    totalTests: number
    infectionRisk: number

}

interface ITreatmentStore {
    allTreatmentData: ITreatmentTracking[]
}

const vaccineLiveResponse = {
    method: 'GET',
    headers: requestHeaders,
}
//use zustand
export const useCovidVaccinationStore = create<ITreatmentStore>((set) => ({
    allTreatmentData: [],
    getResponse: async (vaccine_life_url) => {
        const resp = await fetch(vaccine_life_url, vaccineLiveResponse)
        const json = await resp.json()
        set(state => ({
            allTreatmentData: json.map((aTreat) => {
                return {
                    ...aTreat,
                    id: aTreat.id,
                    country: aTreat.Country,
                    activeCases: aTreat.ActiveCases,
                    totalCases: aTreat.TotalCases,
                    totalTests: aTreat.TotalTests,
                    infectionRisk: aTreat.Infection_Risk
                }
            })
        }))
    },

}))

function BasicCard({content}) {
    return (
        <Grid item xs={12} sm={6} md={3} key={content.id}>
            <Card key={content.id} sx={{minWidth: 275}}>
                <CardHeader
                    title={`${content.country}`}
                />
                <CardContent>
                    <Typography sx={{fontSize: 16}} color="text.secondary" gutterBottom>
                        {content.activeCases}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {content.totalCases}
                    </Typography>
                    <Typography variant="body2">
                        {content.infectionRisk}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    )

}

export default function GetVaccineLive() {

    const getResponse = useCovidVaccinationStore(state => state.getResponse)
    const Alldata = useCovidVaccinationStore(state => state.allTreatmentData)
    return (
        <div>
            <h1>Size: {Alldata.length}</h1>
            <button onClick={() => {
                getResponse(vaccine_life_url)
            }}>Fetch Data
            </button>
            <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start">
                {Alldata.map((aData) => {
                    return (
                        <BasicCard content={aData}/>
                    )
                })}
            </Grid>
        </div>
    );

}