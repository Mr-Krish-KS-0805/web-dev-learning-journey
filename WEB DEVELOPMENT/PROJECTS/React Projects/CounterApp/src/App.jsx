import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setcount] = useState(0)
  const [Theme, setTheme] = useState("light")

  useEffect(() => {
    document.body.className = Theme ;
  }, [Theme])
  
  
  
  return (
    <>
      <div className={`flex flex-col items-center min-w-screen min-h-screen p-20 `}>

        <h1 className="text-3xl font-bold text-blue-400">
          This is a counter app.
        </h1>
        <div className="text-3xl font-bold p-4 flex gap-20  text-blue-400">
          <button onClick={() => setcount(count - 1)} className='bg-blue-700 w-10 h-10 rounded-xl flex justify-center text-center'>-</button>
          <div className='w-10'>{count}</div>
          <button onClick={() => setcount(count + 1)} className='bg-blue-700 w-10 h-10 rounded-xl flex justify-center text-center'>+</button>
        </div>
        <div>
          <button className='text-3xl font-bold text-blue-400 px-2 rounded-xl' onClick={()=>setTheme(Theme === "light" ? "dark" : "light")}> click me change theme</button>
        </div>
      </div>
    </>
  )
}

export default App
