import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const [name, setname] = useState("Harry")
  // const [form, setform] = useState({email: " ", phone: " "})
  const [form, setform] = useState({})

  const handleClick = () => {
    alert("Hey i am clicked")
  }
  const handlechange = (e) => {
    // setname(e.target.value)
    setform({...form, [e.target.name]:e.target.value})
    console.log(form)
  }

  // const handleMouseOver= () => {
  //   alert("Hey i am clicked")
  // }

  return (
    <>
      <div className="button">
        <button onClick={handleClick}>Click me</button>
      </div>

      {/* <div className="red" onMouseOver={handleMouseOver}>
        i am  a red div
      </div> */}

      <input type="text" name='email' value={form.email?form.email:""} onChange={handlechange} />
      <input type="text" name='phone' value={form.phone?form.phone:""} onChange={handlechange} />
    </>
  )
}

export default App
