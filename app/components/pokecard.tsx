"use client"

import { useEffect, useState } from "react"
import Loading from "./loading"

interface pokecardProps{
    name: string
    id:number
    base_experience: number
    abilities: any[]
    type:any[]
    urlGif: string
}

function renderTypes(pokemon: pokecardProps | undefined) {
    let typeColor:string = "";
    if(pokemon == undefined){
        return
    }
    return pokemon.type.map((element) => {
        switch(element.type.name){
            case "grass":
                typeColor = "bg-green-500"
                break
            case "bug":
                typeColor = "bg-indigo-500"
                break  
            case "fire":
                typeColor = "bg-yellow-500"
                break
            case "water":
                typeColor = "bg-blue-500"
                break
            default:
                typeColor = "bg-gray-500"
        }
      return <li className={`${typeColor} font-bold text-white text-center p-1 rounded-lg font-arcade`} key={pokemon.id}>{element.type.name}</li>
      
    })
  }

export default function Pokecard(id:{id:number}){
    const [pokemon, setPokemon] = useState<pokecardProps>()
    const [isLoading, setLoading] = useState<boolean>(true)
    const url = `https://pokeapi.co/api/v2/pokemon/`+(id.id + 1)

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        const pokemon = {
            name:data.name,
            id:data.id,
            base_experience:data.base_experience,
            abilities:data.abilities,
            type:data.types,
            urlGif:data.sprites.versions['generation-v']['black-white'].animated.front_default
        }
        setPokemon(pokemon)
        setLoading(false)
    }
    useEffect(()=>{
        fetchData()
    },[])
   
    
    

    return (
        <>
        {!isLoading ? (
            <div className="bg-red-500 p-2 rounded-lg justify-between flex flex-col shadow-lg" key={pokemon?.name}>
            <div className={`flex  justify-between `}>
                <h1 className="text-2xl font-arcade text-white">{pokemon?.name}</h1>
                <h2 className="text-2xl font-arcade text-white">{pokemon?.base_experience}</h2>
            </div>
            
            <div className="flex justify-between items-center ">
               <img src={pokemon?.urlGif} alt="gif do pokemon"  width={60} height={60}></img>
                <ul className=" flex flex-col gap-1 ">
                    {renderTypes(pokemon)}
                </ul>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-arcade text-yellow-300">Abilities</h2>
                <ul className="flex gap-5">
                    {pokemon?.abilities.map((abil,index)=>{
                        return <li className="text-white font-arcade" key={pokemon.id}>{abil.ability.name}</li>
                    })}
                </ul>
            </div>
        </div>
        ): (
            <Loading></Loading>
           
        )}
        </>         
    )
}