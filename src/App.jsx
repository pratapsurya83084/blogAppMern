import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import DashBoard from './pages/DashBoard';
import Header from './components/Header';
import React from 'react';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/dashboard" element={ <PrivateRoute> <DashBoard /> </PrivateRoute> } />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
