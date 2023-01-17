function RandomComponent({newComponent}){
    return <div>{newComponent}</div>
}
export default function PathA(){
    return <RandomComponent newComponent="I like jack grape 🍇"></RandomComponent>
}