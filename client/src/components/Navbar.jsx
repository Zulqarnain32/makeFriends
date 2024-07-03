
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const handleCloseSlidebar = () => {
    setShowNavbar(false)
  }

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const [userData, setUserData] = useState({});
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    console.log("logout button is clicked");
    window.localStorage.clear();
    axios
      // .get("http://localhost:5000/auth/logout")
      .get("https://make-friends-seven.vercel.app/auth/logout")
      .then((result) => {
        console.log(result.data.message);
        window.location.reload();
        console.log("token is clear " + result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/auth/user')  
      .then(response => {
        console.log("resp ", response);
        setUserData(response.data)
      });
  }, []);

  return (
    <div className="navbar-container">
      <div className="logo-side">
        <h2>MakeFriends</h2>

      </div>
      <div className="menu-icon" onClick={handleShowNavbar}>
        <GiHamburgerMenu className='hamburger' />
       
      </div>
      <div className={`nav-elements  ${showNavbar && 'active'}`}>
      <RxCross2 className='close-nav ' onClick={handleCloseSlidebar}/>
        <Link to="/" className="nav-link" onClick={handleCloseSlidebar}>Users</Link>

        <Link to="/friends" className="nav-link" onClick={handleCloseSlidebar}>
          Friends
        </Link>


        
        <Link className="nav-link " to="/secret">
          Secret
        </Link>
       

        <Link className="nav-link none" to="/secret">
          {userData.email}
        </Link>
        {window.localStorage.length > 0 ? (
          <Link to="/" onClick={handleCloseSlidebar}>
            <button className="login-nav-btn common-btn" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        ) : (
          <Link to="/login" onClick={handleCloseSlidebar}>
            <button className="login-nav-btn common-btn">Login</button>
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar
