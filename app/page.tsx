"use client"
import { useEffect, useState } from "react"
import Pokecard from "./components/pokecard"
import Loading from "./components/loading";

interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export default  function Home() {
  const [limit, setLimit] = useState(12)
  const [pokemons, setPokemons] = useState<PokemonData>()
  const [isLoading, setLoading] = useState<boolean>(true)



  useEffect(()=>{
    
    async function fetchData(){
      setLoading(true)
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`,
        { cache: 'no-cache' },
      );
      const data: PokemonData = await response.json();
      setPokemons(data);
    }
    fetchData()
    setLoading(false)
  
  },[limit])

  return (
    <>
    {isLoading ? <Loading/> : 
    <div className="flex-1 p-5">
      <main className={`grid gap-2 grid-cols-3 `}>
        {isLoading ? <Loading/> : pokemons?.results.map((item, index)=>{
          return <Pokecard id={index}/>
        })}
      </main>
      <button className="bg-blue-500 hover:bg-blue-900 p-2 rounded-full w-8 h-8 items-center flex justify-center mt-5  m-auto" onClick={()=>setLimit(prev=>prev+prev)}><span className="text-lg text-white font-bold mb-0.5">+</span></button>
    </div>
}
    </>
    
  )
}
