import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [allusers,setAllUsers] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/auth/allusers")
    .then(res => {
      console.log(res)
      setAllUsers(res.data)
  })
  }, [])
  
  return (
    <>
      <h1 className='user-head'>All Users</h1>
     <div className='users-container'>
     {
        allusers.map((user,i) => (
          <div key={i} className='single-user'>
             <h2> {user.name}</h2>
             <p>{user.email}</p>
             <button className='add-friend'>Add Friend</button>
          </div>
        ))
      }
     </div>
    </>
  )
}

export default Home
