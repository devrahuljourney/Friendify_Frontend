import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';

function App() {

  const {loggedIn} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="App">
       <Routes>
         <Route path='/' element={ !loggedIn  ? <Home/> : navigate("/login")  } />
         <Route path='/login' element={<Login/>} />
         <Route path=' /signup ' element = { <Signup/> } />
       </Routes>
    </div>
  );
}

export default App;
