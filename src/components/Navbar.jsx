import React from 'react';
import { Link } from 'react-router-dom';
import { StateProvider } from './state/provider';



const Navbar = () => {
  const [{profile,upncompletecartdata}, dispatch]=StateProvider()

  
  
  
  
  
  let cartproduct_length=0

  if(upncompletecartdata!=null){
    cartproduct_length=upncompletecartdata?.cart_products.length
  }
  else{
    cartproduct_length=0
  }
  
  const clearToken =()=>{
    window.localStorage.clear()
    window.location.href = "/login"
  }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#808080"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Shop App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      {
        profile != null ? (
          <div className="navpanel">
                <ul className="navbar-nav  bd-navbar-nav navpanel-left">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link onClick={clearToken} className="nav-link" to="/login">Logout</Link>
              </li>
              </ul>

              <ul className="navbar-nav navpanel-right">

                <li className="nav-item " >
                <Link className="nav-link" to="/profiledetails" >Login as {profile?.prouser?.username}</Link>
                </li>
              
                <li className="nav-item " >
                <Link className="nav-link" to="/cart" >Cart({cartproduct_length})</Link>
                </li>
              </ul>

          </div>
        )
      :
      (
      <ul className="navbar-nav">

          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>

              
      </ul>
      )
      }

    </div>
  </div>
</nav>
        </div>
    );
};

export default Navbar;