import { useState } from 'react'
import './App.css'
import { useForm } from "react-hook-form"

function App() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  // const delay = (d) => {
  //   return new Promise((resolve, reject)=> {
  //     setTimeout(() => {
  //       resolve()    
  //     }, d*1000);
  //   })
  // }
  const onSubmit = async (data) => {
    // await delay(2)
    let r = await fetch("http://localhost:3000/", {method: "POST",headers:{"content-Type":"application/json" },  body: JSON.stringify(data)})
    let res = await r.text()
    console.log(data, res)
  // if(data.username !== "sun"){
  //   setError("myform",{message: "credentials are invalid"} )
  // }
  // if (data.username == "rohan"){
  //   setError("blocked", {message: "this user is blocked"})
  // }
}
  return (
    <>
      {isSubmitting && <div>loading.....</div>}
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='username' {...register("username", { required: {value: true, message: "This field is required"}, minLength:{value:3 , message: "Min length is 3"}, maxLength:{value:8 , message: "Max length is 8"}})} type="text" />
          {errors.username && <div>{errors.username.message}</div>}
          <br />
          <input placeholder='password' {...register("password", {minLength:{value:7 , message: "Min length is 7"}} )} type="password" />
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <input disabled={isSubmitting} type="submit" value="submit" />
          {errors.myform && <div>{errors.myform.message}</div>}
          {errors.blocked && <div>{errors.blocked.message}</div>}
        </form>
      </div>
    </>
  )
}

export default App
