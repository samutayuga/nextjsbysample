import {create} from "zustand";

const vaccine_life_url = 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/'
const api_key = 'fe090460camsh6e6ebf6c31d6427p1d1fd7jsn3f4a011f95c5'
const host = 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('X-RapidAPI-Key', api_key);
requestHeaders.set('X-RapidAPI-Host', host)

const vaccineLiveResponse = {
    method: 'GET',
    headers: requestHeaders,
}
//use zustand
const useAsyncStore = create((set) => ({
    voting: vaccine_life_url,
    Vaccinates: [],
    getResponse: async (vaccine_life_url) => {
        const resp = await fetch(vaccine_life_url,vaccineLiveResponse)
        const json = await resp.json()
        set({Vaccinates: json})
    },

}))

export default function GetVaccineLive() {

    const getResponse = useAsyncStore(state => state.getResponse)
    const Alldata = useAsyncStore(state => state.Vaccinates)
    return (
        <div>
            <h1>Size: {Alldata.length}</h1>
            <ul>
                {Alldata.map((aData) => {
                    return <li key={aData.id}>{aData.Country} / {aData.ActiveCases} / {aData.TotalCases} / {aData.TotalTests} / {aData.Infection_Risk}</li>
                })}
            </ul>

            <button onClick={() => {
                getResponse('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/')
            }}>Fetch Data
            </button>
        </div>
    );

}