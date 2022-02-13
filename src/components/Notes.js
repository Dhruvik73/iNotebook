import React, { useContext, useEffect,useRef,useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import noteContext from '../contexts/notes/notesContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'

export default function Notes() {
  const history=useHistory()
  const context = useContext(noteContext)
  const { note, getallnote,editnote } = context
  const[state,setstate]=useState({id:"",etitle:"",edescription:"",etag:""})
  useEffect(() => {
    if(localStorage.getItem('token')){
      getallnote()
    }
   else{
      history.push('/login')
   }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refclose = useRef(null)
  const updatenote = (currentnote) => {
      ref.current.click();
       setstate({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
  const onchange=(e)=>{
    setstate({...state,[e.target.name]:e.target.value})
}
const click=(e)=>{
  refclose.current.click();
  editnote(state.id,state.etitle,state.edescription,state.etag)
}
  return (<>
    <Addnote/>
<button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
            <div className="mb-3 my-2">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" value={state.etitle} id="exampleInputEmail1" aria-describedby="emailHelp" name='etitle' onChange={onchange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={state.edescription} name='edescription' onChange={onchange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={state.etag} name='etag' onChange={onchange}/>
            </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
        <button disabled={state.etitle.length<=4||state.edescription.length<=4} type="button" className="btn btn-primary" onClick={click}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
      <div className='container'>{note.length===0&&'No Notes to Display'}</div>
      {note.map((notes) => {
        return <Noteitem key={notes._id} updatenote={updatenote}  noteitem={notes} />
      })}
    </div>
  </>
  )
}
