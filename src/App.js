import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notestate from "./contexts/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import {useState } from 'react';

function App() {
  const [alert,setalert]=useState(null)
  const showalert=(message,type)=>{
     setalert({
       message:message,
       type:type
     })
     setTimeout(()=>{
        setalert(null)
     },1500)
  }
  return (
    <>
    <Notestate showalert={showalert}>
      <Router>
       <Navbar />
       <Alert alert={alert}/>
       <div className="container">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/login">
           <Login showalert={showalert}/>
          </Route>
          <Route exact path="/signup">
           <Signup showalert={showalert}/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        </div>
      </Router>
      </Notestate>
     
    </>
  );
}

export default App;
