import {create} from 'zustand';

//define the store
//use function create imported from zustand which takes in a callback function
//to create the store
const useStore = create((set, get) => ({
    votes: 0,
    addVotes: () => set(state => ({votes: get().votes + 1})),
    subtractVotes: () => set(state => ({votes: get().votes - 1})),
}));
export default function VoteDisplay() {

    const addVotes = useStore(state => state.addVotes);
    const subtractVotes = useStore(state => state.subtractVotes);
    const getVotes = useStore(state => state.votes);
    return (
        <div>
            <h1>{getVotes} people have cast their votes</h1>
            <button onClick={addVotes}>Cast a vote</button>
            <button onClick={subtractVotes}>Delete a vote</button>
        </div>
    );
}
