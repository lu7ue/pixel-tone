import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <p className="text-4xl font-bold text-blue-300">
      Hello World!
    </p>
  )
}

export default App
