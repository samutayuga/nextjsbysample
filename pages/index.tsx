import {useState} from 'react'
import fruites from '../config/fruits.json'
import {create} from "domain";
import {Button} from "@mui/material";

export interface IFruit {
    name: string
    history: string
}

function DisplayFruit({fruit}) {
    return <li key={fruit.name}>{fruit.history}</li>
}

function Header({title}) {
    console.log(title)
    return (<h1>{title}</h1>)
}

export default function HomePage() {

    const allFruits: IFruit[] = fruites.map((fr) => {
        const newF: IFruit = {
            ...fr,
            history: fr.description,
            name: fr.name
        }
        return newF
    })
    const [likes, setLikes] = useState(0);

    function handleClick() {
        console.log("increment the like count")
        setLikes(likes + 1);
    }

    return (<div>
        <Header title="I do not really do React. But I can be reactive, 💙.
                It is about component, props and state"/>
        <ul key="myUl">
            {allFruits.map((fruit) => (<DisplayFruit fruit={fruit}></DisplayFruit>))}
        </ul>
        <Button onClick={handleClick}>Like({likes})</Button>
    </div>)
}