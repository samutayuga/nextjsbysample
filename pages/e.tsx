import {create} from "zustand";
import {useRef} from "react";
import {devtools, persist} from "zustand/middleware";

let aStore = (set) => ({
    fruits: ['apple', 'banana', 'orange'],
    addFruits: (fruit) => {
        set(state => (
            {
                fruits: [...state.fruits, fruit]
            }
        ));
    }
})

//persist
aStore = persist(aStore, {name: "basket"})
aStore = devtools(aStore)
const useStoreForArrray = create(aStore);


export default function AddFruitArray() {
    const fruits = useStoreForArrray((state) => state.fruits);
    const addFruits = useStoreForArrray(state => state.addFruits);
    const inputRef = useRef();

    const addFruit = () => {
        addFruits(inputRef.current.value);
        inputRef.current.value = "";
    };

    return (
        <div>
            <h1>I have {fruits.length} fruits in my basket</h1>
            <p>Add a new fruit</p>
            <input ref={inputRef}/>
            <button onClick={addFruit}>Add a Fruit</button>
            {fruits.map((fruit) => (
                <p key={fruit}>{fruit}</p>
            ))}
        </div>
    )
}