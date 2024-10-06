import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Register";
import Profile from "./components/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/Firebase";

function App() {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/register" element={user?  <Navigate to="/profile" /> : <SignUp />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
