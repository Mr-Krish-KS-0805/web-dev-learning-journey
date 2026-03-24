import React from 'react'
import "./Card.css"

const Card = (props) => {
  return (
    <div className='card' style={{overflow: "hidden"}}>
      <img src="https://th.bing.com/th/id/OIP.oMqLPvgHIQptI0FkI87X8gHaHa?w=152&h=182&c=7&r=0&o=5&cb=defcache2&dpr=1.3&pid=1.7&defcache=1" alt="" width={280} height={230}
      style={{border: "2px solid black"}}/>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
    </div>
  )
}
export default Card
