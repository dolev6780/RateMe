import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Footer from './components/Footer';
import { useUserContext } from "./hooks/useUserContext";

const Wrapper = ({ children }) => {
  const { user } = useUserContext();

  return user ? (
    children
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Wrapper>
                <Home />
              </Wrapper>
            }
          />
          <Route
            path="/signin"
            element={<SignIn />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
