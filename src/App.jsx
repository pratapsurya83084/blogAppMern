import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import DashBoard from "./pages/DashBoard";
import Header from "./components/Header";
import React from "react";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollTotop from "./components/ScrollTotop";
function App() {
  return (
    <Router>
        <ScrollTotop/>
      <Header />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/post/:slug" element={<PostPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <DashBoard />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateAdminRoute>
              {" "}
              <CreatePost />{" "}
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/update-post/:postId"
          element={
            <PrivateAdminRoute>
              {" "}
              <UpdatePost />{" "}
            </PrivateAdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
