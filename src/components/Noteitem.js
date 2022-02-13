import React, { useContext } from 'react'
import noteContext from '../contexts/notes/notesContext'

export default function Noteitem(props) {
    const {deletenote}=useContext(noteContext)
    const{noteitem,updatenote}=props;
    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                    <h5 className="card-title">{noteitem.title}</h5>
                    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deletenote(noteitem._id)}}></i> 
                   <i className="fa-solid fa-pen-to-square" onClick={()=>{updatenote(noteitem)}}></i>
                    </div>
                    <p className="card-text">{noteitem.description}</p>
                   </div>
            </div>
        </div>
    )
}
