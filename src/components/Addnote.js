import React, { useContext,useState } from 'react'
import noteContext from '../contexts/notes/notesContext'
import Alert from './Alert'

export default function Addnote(props) {
    const {addnote}=useContext(noteContext)
    const[state,usestate]=useState({title:"",description:"",tag:""})
    const click=(e)=>{
        e.preventDefault();
        addnote(state.title,state.description,state.tag);
        usestate({title:'',description:'',tag:''})
    }
    const onchange=(e)=>{
        usestate({...state,[e.target.name]:e.target.value})
    }
    return (
        <div >
                <form>
            <div className="mb-3 my-5">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="exampleInputEmail1" value={state.title} aria-describedby="emailHelp" name='title' onChange={onchange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={state.description} name='description' onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={state.tag} name='tag' onChange={onchange}/>
            </div>

            <button type="submit" className="btn btn-primary" onClick={click} disabled={state.title.length<=4||state.description.length<=4}>Add note</button>
        </form></div>
    )
}
