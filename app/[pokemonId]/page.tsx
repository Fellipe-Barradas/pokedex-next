"use client";
import Loading from "@/components/loading";
import useFetch from "@/hook/useFetchPokemon";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface pokecardProps {
  name: string;
  id: number;
  base_experience: number;
  abilities: any[];
  move: {
    name: string;
  };
  species: {
    name: string;
  };
  weight: number;
  height: number;
  types: {
    type: {
      name: string;
    };
  }[];
  urlGif: string;
}

function renderTypes(pokemon: pokecardProps | undefined) {
  let typeColor: string = "";
  if (pokemon == undefined) {
    return;
  }

  return pokemon.types.map((type) => {
    switch (type.type.name) {
      case "grass":
        typeColor = "bg-green-500";
        break;
      case "bug":
        typeColor = "bg-indigo-500";
        break;
      case "fire":
        typeColor = "bg-yellow-500";
        break;
      case "water":
        typeColor = "bg-blue-500";
        break;
      case "poison":
        typeColor = "bg-purple-500";
        break;
      case "flying":
        typeColor = "bg-gray-100";
        break;
      case "electric":
        typeColor = "bg-orange-500";
        break;
      case "fairy":
        typeColor = "bg-pink-500";
        break;
      case "ground":
        typeColor = "bg-red-900";
        break;
      default:
        typeColor = "bg-gray-500";
    }
    return (
      <li
        key={type.type.name}
        className={`text-lg font-arcade border-2 p-2 rounded-lg border-zinc-800 ${typeColor} border-2 text-black `}
      >
        {type.type.name}
      </li>
    );
  });
}

export default function Page() {
  const { fetchData, isLoading, pokemon } = useFetch();
  const pokemonId = useParams();

  useEffect(() => {
    fetchData(parseInt(pokemonId.pokemonId));
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className=" flex-1" key={pokemon?.name}>
          <div className="justify-between flex flex-col flex-1 shadow-lg w-fit m-auto  mt-10 p-5 rounded-md bg-gradient-to-b from-red-400 to-red-700 border  border-black">
            <div className={`flex  justify-between flex-col items-center  `}>
              <h1 className="text-5xl font-arcade text-zinc-900">
                {pokemon?.name}
              </h1>
              <h2 className="text-2xl font-arcade text-black font-thin">
                {pokemon?.base_experience}
              </h2>
            </div>

            <div className="flex justify-center flex-col gap-10 items-center ">
              <img
                className="border-2 border-black fundo_pokemon p-4"
                src={pokemon?.urlGif}
                alt="gif do pokemon"
                width={180}
                height={180}
              ></img>
              <ul className="flex  justify-center gap-10 p-1 w-full">
                {renderTypes(pokemon)}
              </ul>
            </div>

            <div className="mt-6 flex justify-center flex-col items-center  bg-white  p-2 rounded-md shadow-lg border border-black w-[180px] m-auto">
              <h2 className="text-2xl font-arcade text-yellow-300">
                Abilities
              </h2>
              <ul className="flex gap-5 w ">
                {pokemon?.abilities.map((abil, index) => {
                  return (
                    <li
                      className="text-black font-arcade font-thin text-sm"
                      key={pokemon.id}
                    >
                      {abil.ability.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
