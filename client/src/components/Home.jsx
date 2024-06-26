import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [allUsers, setAllUsers] = useState([])
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/auth/allusers")
      .then(res => {
        setAllUsers(res.data)
      })
  }, [])

  const addFriend = async (friendId) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/addfriend", { friendId }, { withCredentials: true });
      setFriends(res.data.friends);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  }

  return (
    <>
      <h1 className='user-head'>All Users</h1>
      <div className='users-container'>
        {
          allUsers.map((user, i) => (
            <div key={i} className='single-user'>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <button className='add-friend' onClick={() => addFriend(user._id)}>Add Friend</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Home
