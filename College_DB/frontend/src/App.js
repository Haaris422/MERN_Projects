import './App.css';

import { useEffect, useState } from 'react';
import Homepage from './homepage/homepage';
import Login from './login/login';
import Register from './register/register';
import Single from './components/singleStd'
import Auxilary from './components/auxAd'
import StdLogin from './login/stdLogin'
import StdHomepage from './homepage/stdHomepage'
import NoticeUpload from './components/notices';
import StdN from './components/stdnotices'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {

  const [user, setLoginUser] = useState({})
  const [std, setLoginStd] = useState({})
  
  useEffect(()=>{
    setLoginStd(JSON.parse(localStorage.getItem("LoggedIn")))
  }, [])
  const updateStd = (std) => {
    localStorage.setItem("LoggedIn", JSON.stringify(std))
    setLoginStd(std)
  }
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route  exact path="/" element={user && user._id ?
              <Homepage setLoginUser={setLoginUser}/>
              :
              <Login setLoginUser={setLoginUser}/>}>
            </Route>
            <Route  path="/login" element={<Login setLoginUser={setLoginUser}/>}></Route>
            <Route  path="/register" element={<Register/>}></Route>
            <Route  path="/single" element={<Single/>}></Route>
            <Route  path="/auxilary" element={<Auxilary/>}></Route>  
            <Route  path="/noticesUp" element={<NoticeUpload/>}></Route>
            <Route  exact path="/stdHomepage" element={std && std._id ?
              <StdHomepage updateStd={updateStd}/>
              :
              <StdLogin updateStd={updateStd}/>}>
            </Route>
            <Route path="/stdLogin" element={<StdLogin updateStd={updateStd}/>}></Route>
            <Route path="/stdN" element={<StdN/>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
    
  );
}

export default App;
