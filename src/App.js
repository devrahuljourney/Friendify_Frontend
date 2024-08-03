import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import VerifyEmail from './page/VerifyEmail';
import Profile from './page/Profile';
import Explore from './page/Explore';
import Notifications from './page/Notifications'; 
import Post from './page/Post';
import EditProfile from './components/ProfilePage/EditProfile';
import PrivateRoute from './components/auth/PrivateRoute';
import Chat from './page/Chat';
import Conversation from './page/Conversation';

function App() {
  const { loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/login");
  //   }
  // }, [loggedIn, navigate]); 

  const {dark} = useSelector((state) => state.profile)

  return (
    <div className= {`App  overflow-x-hidden ${dark ? "dark" :"light"}`}>
    
      <Routes>
        <Route  element={<PrivateRoute><Home /></PrivateRoute>}>
          {/* Nested routes for Home page */}
          <Route path= "/" element = {<Post/>} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/edit/:userId' element= {<EditProfile/>} />
          <Route path='/search' element={<Explore />} />
          <Route path='/chat/senderId/:senderId/receiverId/:receiverId/:name' element={<Conversation />} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
