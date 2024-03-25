import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import VerifyEmail from './page/VerifyEmail';

function App() {

  const {loggedIn} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
     if(!loggedIn)
     {
      navigate("/login")
     }
  }, []);
  return (
    <div className="App">
       <Routes>
         <Route path='/' element={ <Home/>  } />
         <Route path='/login' element={<Login/>} />
         <Route path='/signup' element = { <Signup/> } />
         <Route path='/verify-email' element={<VerifyEmail/>} />
       </Routes>
    </div>
  );
}

export default App;
