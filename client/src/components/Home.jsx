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
      <h1>Home page</h1>
      <h2>All Users</h2>
      {
        allusers.map((user,i) => (
          <div key={i}>
             <h1>{user.name}</h1>
             <h1>{user.email}</h1>
          </div>
        ))
      }
    </>
  )
}

export default Home
