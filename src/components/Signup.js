import React,{useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup(props) {
    const [data,setdata]=useState({name:'',email:'',password:''})
    let history=useHistory()
    const click=async(e)=>{
       e.preventDefault();
       const response = await fetch('http://localhost:5000/api/auth/creatuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:data.name,email:data.email,password:data.password})
      });
      const json= await response.json();
      if(json.success){
        history.push('/')
        localStorage.setItem('token',json.authtoken)
        props.showalert('User created successfully','success')
      }
      else if(data.name.length<=2){
        props.showalert('Name is envalid','danger')
      }
      else{
        props.showalert('User is already exists','danger')
      }
    }
    const onchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    return (<>
        <div className='container'>
        <form onSubmit={click}>
               <div className="mb-3 my-5">
               <h3>Signup to use iNotebook</h3>
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={data.name} onChange={onchange} aria-describedby="emailHelp" min={3} required />
            </div>
            <div className="mb-3 my-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={data.email} onChange={onchange} aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={data.password} onChange={onchange} id="password" min={8} required />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
        </form></div>
        </>
    )
}
