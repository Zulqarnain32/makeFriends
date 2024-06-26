import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Friends = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/auth/friends", { withCredentials: true })
      .then(res => {
        setFriends(res.data)
      })
  }, [])

  return (
    <>
      <h1>Your Friends</h1>
      <div className='friends-container'>
        {
          friends.map((friend, i) => (
            <div key={i} className='single-friend'>
              <h2>{friend.name}</h2>
              <p>{friend.email}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Friends
