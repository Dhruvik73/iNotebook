import React from 'react'
import {Link,useLocation} from "react-router-dom"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function Navbar() {
  const history=useHistory()
  const Location=useLocation();
  const logout=()=>{
    localStorage.setItem('token','')
    history.push('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${Location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${Location.pathname==="/about"?"active":""}`} to="/about">About</Link>
          </li>
          </ul>
          {!localStorage.getItem('token')?<div>
          <Link className="btn btn-primary mx-2 " to='/login' role="button" aria-disabled="true">Login</Link>
          <Link className="btn btn-primary " to='/signup' role="button" aria-disabled="true">Signup</Link></div>:<button onClick={logout} className='btn btn-primary'>Logout</button> }
      </div>
    </div>
  </nav>
  )
}
