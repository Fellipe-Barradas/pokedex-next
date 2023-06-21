import React from 'react'
import Image from 'next/image'
export default function Navbar() {
  return (
    <div className='bg-red-500 p-2  flex justify-between items-center'>
      <h1 className=' text-3xl font-pokemon bg-clip-text text-white mb-2 ml-3'>POKEDEX</h1>
      <Image src={"/pokebola.png"} alt='Meus pokemons' width={40} height={40} className='mr-3'/>
    </div>
  )
}
