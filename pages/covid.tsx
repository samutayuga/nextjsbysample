import {create} from "zustand";

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
    voting: vaccine_life_url,
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

export default function GetVaccineLive() {

    const getResponse = useCovidVaccinationStore(state => state.getResponse)
    const Alldata = useCovidVaccinationStore(state => state.allTreatmentData)
    return (
        <div>
            <h1>Size: {Alldata.length}</h1>
            <ul>
                {Alldata.map((aData) => {
                    return <li
                        key={aData.id}>{aData.country} / {aData.activeCases} / {aData.totalCases} / {aData.totalTests} / {aData.infectionRisk}</li>
                })}
            </ul>

            <button onClick={() => {
                getResponse('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/')
            }}>Fetch Data
            </button>
        </div>
    );

}