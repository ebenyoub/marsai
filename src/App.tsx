import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './vite.svg'
import './App.css'

function App() {
  /* console.log("Nom de l'app :", import.meta.env.VITE_APP_NAME);*/

  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-green-500">
      <h1 className="text-4xl font-bold text-white">
        Tailwind OK 🚀
      </h1>
    </div>
    
    </>
  )
}

export default App
