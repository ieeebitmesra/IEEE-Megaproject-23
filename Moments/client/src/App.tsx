//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Navigate to="/posts" replace />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route exact path="/posts/:id" element={<PostDetails />} />
            {!user ? (
              <Route exact path="/auth" element={<Auth />} />
            ) : (
              <Route exact path="/posts" element={<Home />} />
            )}
            {/* <Route
              exact
              path="/auth"
              element={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
            /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
