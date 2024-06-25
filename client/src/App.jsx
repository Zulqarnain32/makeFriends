import React from 'react'
import("./App.css")
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Registration from './components/Registration'
import Secret from './components/Secret'
import Friends from './components/Friends'

const App = () => {
  return (

    <>
      <BrowserRouter>
      <Navbar/>
         <Routes>
           <Route path='/' element = {<Home/>}/>
           <Route path='/login' element = {<Login/>}/>
           <Route path='/friends' element = {<Friends/>}/>
           <Route path='/register' element = {<Registration/>}/>
           <Route path='/secret' element = {window.localStorage.length > 0 ? <Secret/> : <Home/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
