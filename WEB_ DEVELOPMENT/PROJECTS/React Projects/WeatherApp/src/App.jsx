import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'

function App() {

  const [CityName, setCityName] = useState("")
  const [weatherData, setweatherData] = useState(null)

  const weather = async () => {
    if (CityName === "") {
      alert("Please enter city name")
      setweatherData(null)
    }

    else {
      let res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=98718b0e17ef41b7947173337263004&q=${CityName}`)
      console.log(res.data)
      setweatherData(res.data)
    }



  }

  useEffect(() => {
    // weather();
  }, [])


  return (
    <>
      <div className='min-w-screen min-h-screen bg-blue-800 flex justify-center items-center'>
        <div className='bg-sky-300 w-[30vw] h-[75vh] rounded-2xl flex flex-col' >
          <div className='flex flex-col p-10 gap-4'>
            <input type="text" value={CityName} onChange={(e) => setCityName(e.target.value)} className='text-2xl rounded-full placeholder:font-bold p-2 border-3 border-blue-700-700 outline-0' placeholder='search city' />
            <button onClick={weather} className='bg-blue-700 text-2xl rounded-full p-2 text-white active:bg-blue-800 font-bold active:text-cyan-700'>Check weather</button>
          </div>
          <div className='flex flex-col items-center text-center gap-3 '>
            <div className='w-fit h-[30vh] px-4 text-3xl py-2 flex flex-col gap-3 bg-orange-400 font-bold rounded-3xl m-10'>Temperature
              <div>{weatherData?.current ? Math.round(weatherData.current.temp_c): "" }</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
