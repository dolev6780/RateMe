import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Footer from './components/Footer';
import { useUserContext } from './hooks/useUserContext';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import RandomRates from './pages/RandomRates';

function App() {
  const { user } = useUserContext();
 
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signin" replace={true} />}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path={`/profile/${user && user.user && user.user._id}`}
            element={<Profile />}
          />
          <Route
            path={`/editprofile/${user && user.user && user.user._id}`}
            element={<EditProfile />}
          />
          <Route
            path={`/randomrates`}
            element={<RandomRates/>}
          />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
