import { useState } from "react"

interface pokecardProps{
    name: string
    id:number
    base_experience: number
    abilities: any[]
    move:{
        name:string
    }
    species:{
        name:string
    }
    weight:number
    height:number
    types:{
        type:{
            name:string
        }
    }[]
    urlGif: string
}



const useFetch = () => {
    const [pokemon, setPokemon] = useState<pokecardProps>()
    const [isLoading, setLoading] = useState<boolean>(true)
    

    const fetchData = async (id:number) => {
        const url = `https://pokeapi.co/api/v2/pokemon/`+(id + 1)
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()

        const pokemon:pokecardProps = {
            name:data.name,
            id:data.id,
            base_experience:data.base_experience,
            abilities:data.abilities,
            types:data.types,
            urlGif:data.sprites.versions['generation-v']['black-white'].animated.front_default,
            weight:data.weight,
            height:data.height,
            move:data.moves,
            species:data.species
        }
        setPokemon(pokemon)
        setLoading(false)
    }

    
    return {
        pokemon, isLoading, fetchData
    }
}

export default useFetch