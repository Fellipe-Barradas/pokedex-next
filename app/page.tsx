import Pokecard from "./components/pokecard"

export default async function Home() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
  const data = await response.json()


  return (
    <div className="flex-1">
      <h1 className="">Pokémons:</h1>
      {data.results.map((res:any, index:number)=>{
        return <Pokecard  id={index}/>
      })}
    </div>
    
  )
}
