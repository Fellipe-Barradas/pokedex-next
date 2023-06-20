// API 
// Nome https://pokeapi.co/api/v2/pokemon/1/ => name | base_experience | abilities[i].ability.name | 
// versions.generation-v.black-white.animated.front-default

import Image from "next/image"
interface abilitiesProps{
    abilitie_name:string
}

interface pokecardProps{
    name: string
    base_experience: number
    abilities: abilitiesProps[]
    urlGif: string
}

export default async function Pokecard(id:any){

    const url = `https://pokeapi.co/api/v2/pokemon/` + (id.id+1)
    const response = await fetch(url)
    const data = await response.json()
    const pokemon:pokecardProps = {
        name:data.name,
        base_experience:data.base_experience,
        abilities:data.abilities,
        urlGif:data.sprites.versions['generation-v']['black-white'].animated.front_default
    }
  
    return (
        <div>
            <div>
                <h1>{pokemon.name}</h1>
                <h2>{pokemon.base_experience}</h2>
            </div>
            <img src={pokemon.urlGif} alt="gif do pokemon" ></img>
           
        </div>
    )
}