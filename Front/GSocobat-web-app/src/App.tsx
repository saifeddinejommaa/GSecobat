import { useState } from 'react'
import GlassDashboard from "./components/FirstScreen";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GlassDashboard/> </>
  )
}

export default App
