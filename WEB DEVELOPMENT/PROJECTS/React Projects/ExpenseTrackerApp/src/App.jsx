import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MainLayout from './layouts/MainLayout'


const [expenses, setExpenses] = useState(second)

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainLayout expenses={expenses} setExpenses={setExpenses}/>
  )
}

export default App
