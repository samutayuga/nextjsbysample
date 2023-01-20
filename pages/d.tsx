import {create} from "zustand";

const voting = "https://api.github.com/search/users?q=john&per_page=5";
const useAsyncStore = create((set) => ({
    voting: voting,
    Votes: {},
    fetch: async (voting) => {
        const resp = await fetch(voting)
        const json = await resp.json()
        set({Votes: json.items})
    },

}))

export default function GetVotes() {
    const votes = useAsyncStore(state => state.Votes)
    const fetch = useAsyncStore(state => state.fetch)
    return (
        <div>
            <h1>{votes.length} people have cast their votes</h1>
            <button onClick={() => {
                fetch(voting)
            }}>Fetch votes
            </button>
        </div>
    );

}