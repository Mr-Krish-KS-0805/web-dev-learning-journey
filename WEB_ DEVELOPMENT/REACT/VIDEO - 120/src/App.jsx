import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, multiply } from './redux/counter/counterSlice'


function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <Navbar/>
        <button onClick={() => dispatch(decrement())}>-</button>
        currently count is {count}
        <button onClick={()=> dispatch(increment())}>+</button>
        <br />
        <button onClick={()=> dispatch(multiply())}>multiply</button>
      </div>
    </>
  )
}

export default App
