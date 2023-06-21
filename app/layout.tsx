import Navbar from '@/layout/navbar'
import './globals.css'
import Footer from '@/layout/footer'

export const metadata = {
  title: 'Pokedex',
  
  description: 'Pokedex feita utilizando a pokeAPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="pokebola.png" type="image/x-icon" />
      </head>
      <body className={"  bg-gradient-to-r from-slate-50 to-zinc-100  h-screen flex flex-col"}>

        <Navbar/>
        
        {children}
        <Footer/>
      </body>
    </html>
  )
}
