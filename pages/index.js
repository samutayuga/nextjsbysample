import {useState} from 'react'

function Header({title}) {
    console.log(title)
    return (<h1>{title}</h1>)
}

export default function HomePage() {

    const allFruits = ['jackfruit', 'durian', 'water melon']
    const [likes, setLikes] = useState(0);

    function handleClick() {
        console.log("increment the like count")
        setLikes(likes + 1);
    }

    return (<div>
            <Header title="I do not really do React. But I can be reactive, 💙.
                It is about component, props and state"/>
            <ul>
                {allFruits.map((fruit) => (<li>{fruit}</li>))}
            </ul>
            <button onClick={handleClick}>Like({likes})</button>
        </div>)
}