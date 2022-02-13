import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login(props) {
    const [data,setdata]=useState({email:'',password:''})
    let history=useHistory();
    const click=async(e)=>{
       e.preventDefault();
       const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:data.email,password:data.password})
      });
      const json= await response.json();
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        history.push('/')
        props.showalert('login successfully','success')
      }
      else{
          alert('data is wrong')
      }
    }
    const onchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
  return (
  <div className='container'><form onSubmit={click}>
    <div className="mb-3 my-5">
    <h3>Login to use iNotebook</h3>
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={data.email} onChange={onchange} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" name='password'value={data.password} onChange={onchange} id="exampleInputPassword1"/>
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form></div>
  )
}
