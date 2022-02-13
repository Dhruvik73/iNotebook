import NoteContext from "./notesContext";
import { useState } from "react";
const Notestate=(props)=>{
  let a=false;
    const host="http://localhost:5000"
    const[note,setnote]=useState([])
    const getallnote=async()=>{
        //fetch api
        const response = await fetch(`${host}/api/notes/fetchnote`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            }
          });
          const json= await response.json();
          setnote(json);
       }
    const addnote=async(title,description,tag)=>{
        //fetch api
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const json= await response.json();
        //add note
     setnote(note.concat(json))
     props.showalert('Note added successfully','success')
    }
    const deletenote=async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            }
          });
       const newnote=(note)=>{
         return note._id!==id
       }
       setnote(note.filter(newnote))
       props.showalert('Note deleted successfully','success')
    }
    const editnote=async (id,title,description,tag)=>{
        //fetch api
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const json= response.json(); 
          //edit not
          let newnote=JSON.parse(JSON.stringify(note))
          for (let index = 0; index < newnote.length; index++) {
            // const element=newnote[index];
            if(newnote[index]._id===id){
                newnote[index].title=title;
                newnote[index].description=description;
                newnote[index].tag=tag;
                break;
            }
           
            }
         setnote(newnote)
         props.showalert('Note edited successfully','success')
    }
    return(
     <NoteContext.Provider value={{note,addnote,deletenote,editnote,getallnote,a}}>
         {props.children}
     </NoteContext.Provider>
    )
}
export default Notestate;